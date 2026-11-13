/*
 * Ponto de entrada: liga idioma, rota, tela atual, foco e título.
 * Fluxo: o roteador avisa que a URL mudou -> handle() -> render() monta a tela.
 * As telas pedem nova renderização (sem mudar a URL) com ctx.refresh(motivo).
 */
(function (MF) {
  'use strict';

  var viewRoot;
  var currentRoute;

  var views = {
    intro: function (ctx) { return MF.views.intro(ctx); },
    card: function (ctx) { return MF.views.card(ctx); },
    quizIntro: function (ctx) { return MF.views.quizIntro(ctx); },
    quiz: function (ctx) { return MF.views.quiz(ctx); },
    result: function (ctx) { return MF.views.result(ctx); }
  };

  function go(route) {
    MF.router.go({ lang: MF.i18n.getLang(), name: route.name, index: route.index });
  }

  /** Renderiza a tela da rota atual. `reason`: init | navigate | language | ack | answer. */
  function render(reason) {
    var ctx = {
      route: currentRoute,
      reason: reason,
      go: go,
      refresh: function (why) { render(why); }
    };
    var view = views[currentRoute.name](ctx);

    MF.dom.clear(viewRoot).appendChild(view.node);
    viewRoot.className = 'view' + (reason === 'navigate' ? ' view--enter' : '');
    document.title = view.title + ' – ' + MF.i18n.t('app.name');

    // Foco: só quando o visitante age (navegar, "Entendi", responder). Nunca no carregamento nem na troca de idioma.
    if (reason !== 'init' && reason !== 'language') {
      MF.a11y.focus(viewRoot.querySelector('[data-autofocus]'));
    }
    if (reason === 'navigate') window.scrollTo(0, 0);
  }

  function handle(reason) {
    var route = MF.router.parse();

    // Tela de resultado só faz sentido com o quiz completo (ex.: link direto): volta para o quiz.
    if (route.name === 'result' && !MF.state.allAnswered()) {
      route = { lang: route.lang, name: 'quizIntro' };
      MF.router.normalize(route);
    }

    var languageChanged = route.lang !== MF.i18n.getLang();
    if (languageChanged) {
      MF.i18n.setLang(route.lang);
      MF.components.header.refresh();
    }

    MF.router.normalize(route);
    currentRoute = route;

    if (languageChanged && reason !== 'init') reason = 'language';
    render(reason);

    if (reason === 'language') {
      MF.a11y.announce(MF.i18n.t('lang.changed', { name: MF.i18n.languageName(route.lang) }));
    }
  }

  function selectLanguage(code) {
    if (code === MF.i18n.getLang()) return;
    var route = MF.router.parse();
    route.lang = code;
    MF.router.replace(route, 'language'); // troca de idioma não cria entrada no histórico
  }

  function start() {
    viewRoot = document.getElementById('view');
    var initial = MF.router.parse();

    MF.i18n.setLang(initial.lang);
    MF.a11y.init();
    MF.components.header.init(selectLanguage);
    MF.router.onChange(handle);
    handle('init');
  }

  start();
})(window.MF);
