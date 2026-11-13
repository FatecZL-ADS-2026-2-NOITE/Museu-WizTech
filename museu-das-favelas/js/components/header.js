/*
 * Cabeçalho e rodapé (HTML estático em index.html; aqui só ligamos o comportamento):
 *  - logotipo (espaço reservado), botões de idioma
 *  - barra de acessibilidade (fonte e contraste)
 *  - link oficial e aviso de versão preliminar no rodapé
 * Os elementos não são recriados a cada navegação, então o foco do teclado nunca se perde.
 */
(function (MF) {
  'use strict';

  MF.components = MF.components || {};
  var el = MF.dom.el;
  var langButtons = [];

  function renderLogo() {
    var slot = document.getElementById('logo-slot');
    MF.dom.clear(slot).appendChild(
      MF.components.imageSlot('logo', { variant: 'logo', highContrast: MF.a11y.isHighContrast() })
    );
  }

  function buildLanguageButtons(onSelect) {
    var group = document.getElementById('lang-switcher');
    MF.config.languages.forEach(function (lang) {
      var button = el('button', {
        type: 'button',
        className: 'lang__btn',
        'aria-pressed': 'false',
        dataset: { lang: lang.code },
        onclick: function () { onSelect(lang.code); }
      }, [
        el('span', { text: lang.short }),
        el('span', { className: 'sr-only', lang: lang.code, text: ' – ' + lang.name })
      ]);
      langButtons.push(button);
      group.appendChild(button);
    });
  }

  function refreshLanguageButtons() {
    var current = MF.i18n.getLang();
    langButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', button.dataset.lang === current ? 'true' : 'false');
    });
  }

  /** Botões de fonte indisponíveis nos limites usam aria-disabled (continuam focáveis e anunciam o limite). */
  function refreshToolbar() {
    document.getElementById('font-decrease').setAttribute('aria-disabled', MF.a11y.canDecrease() ? 'false' : 'true');
    document.getElementById('font-increase').setAttribute('aria-disabled', MF.a11y.canIncrease() ? 'false' : 'true');
    document.getElementById('contrast-toggle').setAttribute('aria-pressed', MF.a11y.isHighContrast() ? 'true' : 'false');
  }

  function bindToolbar() {
    document.getElementById('font-decrease').addEventListener('click', MF.a11y.decreaseFont);
    document.getElementById('font-reset').addEventListener('click', MF.a11y.resetFont);
    document.getElementById('font-increase').addEventListener('click', MF.a11y.increaseFont);
    document.getElementById('contrast-toggle').addEventListener('click', MF.a11y.toggleContrast);
    MF.a11y.subscribe(function () { refreshToolbar(); renderLogo(); });
  }

  /** Textos que dependem do idioma e do arquivo de configuração. */
  function refresh() {
    refreshLanguageButtons();
    renderLogo();
    document.getElementById('official-link').setAttribute('href', MF.config.officialVisitUrl);
    document.getElementById('review-notice').hidden = !MF.config.showReviewNotice;
  }

  function init(onLanguageSelect) {
    MF.dom.hydrateIcons(document);
    buildLanguageButtons(onLanguageSelect);
    bindToolbar();
    refreshToolbar();
    refresh();
  }

  MF.components.header = { init: init, refresh: refresh };
})(window.MF);
