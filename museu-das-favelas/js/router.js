/*
 * Roteador por hash (funciona em qualquer hospedagem estática e abrindo o arquivo do disco).
 * Idioma e etapa ficam na URL, então "Voltar" do navegador, recarregar a página e links diretos funcionam.
 *
 *   #/pt-BR/inicio        -> intro
 *   #/pt-BR/regras/3      -> card (etapa 3)
 *   #/pt-BR/quiz          -> quizIntro
 *   #/pt-BR/quiz/2        -> quiz (pergunta 2)
 *   #/pt-BR/resultado     -> result
 *
 * Uma rota é { lang, name, index } (index começa em 1 e só existe para card e quiz).
 */
(function (MF) {
  'use strict';

  var listeners = [];

  function clamp(n, max) {
    var value = parseInt(n, 10);
    if (isNaN(value) || value < 1) return 1;
    return value > max ? max : value;
  }

  function parse() {
    var parts = (location.hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
    var lang = MF.i18n.match(parts[0]);
    var rest = lang ? parts.slice(1) : parts;
    var route = { lang: lang || MF.i18n.detect(), name: 'intro' };

    if (rest[0] === 'regras') {
      route.name = 'card';
      route.index = clamp(rest[1], MF.categories.length);
    } else if (rest[0] === 'quiz') {
      route.name = rest[1] ? 'quiz' : 'quizIntro';
      if (rest[1]) route.index = clamp(rest[1], MF.quiz.length);
    } else if (rest[0] === 'resultado') {
      route.name = 'result';
    }
    return route;
  }

  function path(route) {
    switch (route.name) {
      case 'card': return 'regras/' + route.index;
      case 'quizIntro': return 'quiz';
      case 'quiz': return 'quiz/' + route.index;
      case 'result': return 'resultado';
      default: return 'inicio';
    }
  }

  function format(route) {
    return '#/' + route.lang + '/' + path(route);
  }

  function emit(reason) {
    listeners.forEach(function (fn) { fn(reason); });
  }

  /** Navega criando uma entrada no histórico (botão Voltar do navegador funciona). */
  function go(route) {
    var target = format(route);
    if (location.hash === target) emit('navigate');
    else location.hash = target; // dispara hashchange
  }

  /** Atualiza a URL sem criar entrada no histórico (ex.: troca de idioma). */
  function replace(route, reason) {
    history.replaceState(null, '', format(route));
    emit(reason || 'navigate');
  }

  /** Corrige a URL para a forma canônica sem renderizar de novo. */
  function normalize(route) {
    if (location.hash !== format(route)) history.replaceState(null, '', format(route));
  }

  window.addEventListener('hashchange', function () { emit('navigate'); });

  MF.router = {
    parse: parse,
    format: format,
    go: go,
    replace: replace,
    normalize: normalize,
    onChange: function (fn) { listeners.push(fn); }
  };
})(window.MF);
