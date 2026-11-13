/*
 * Acessibilidade: avisos para leitores de tela, gestão de foco e preferências do visitante
 * (tamanho da fonte e alto contraste). As preferências ficam só em memória durante a visita.
 */
(function (MF) {
  'use strict';

  var t = MF.i18n.t;
  var steps = MF.config.fontSteps;
  var fontIndex = MF.config.defaultFontStepIndex;
  var highContrast = false;
  var subscribers = [];

  function notify() {
    subscribers.forEach(function (fn) { fn(); });
  }

  /** Anuncia uma mensagem na região "ao vivo". O atraso garante que repetições sejam lidas. */
  function announce(message) {
    var live = document.getElementById('live');
    if (!live) return;
    live.textContent = '';
    window.setTimeout(function () { live.textContent = message; }, 60);
  }

  /** Move o foco para um elemento (mesmo que ele não seja focável por padrão). */
  function focus(node) {
    if (!node) return;
    if (!node.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(node.tagName)) {
      node.setAttribute('tabindex', '-1');
    }
    node.focus();
  }

  function applyFont() {
    document.documentElement.style.setProperty('--font-scale', String(steps[fontIndex]));
    notify();
  }

  function changeFont(delta) {
    var next = fontIndex + delta;
    if (next < 0) { announce(t('a11y.fontMin')); return; }
    if (next >= steps.length) { announce(t('a11y.fontMax')); return; }
    fontIndex = next;
    applyFont();
    announce(t('a11y.fontChanged', { percent: Math.round(steps[fontIndex] * 100) }));
  }

  function resetFont() {
    fontIndex = MF.config.defaultFontStepIndex;
    applyFont();
    announce(t('a11y.fontChanged', { percent: Math.round(steps[fontIndex] * 100) }));
  }

  function applyContrast() {
    document.documentElement.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
    notify();
  }

  function toggleContrast() {
    highContrast = !highContrast;
    applyContrast();
    announce(t(highContrast ? 'a11y.contrastOn' : 'a11y.contrastOff'));
  }

  /** Respeita a preferência do sistema por mais contraste, se existir. */
  function init() {
    if (window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches) highContrast = true;
    applyFont();
    applyContrast();
  }

  MF.a11y = {
    init: init,
    announce: announce,
    focus: focus,
    increaseFont: function () { changeFont(1); },
    decreaseFont: function () { changeFont(-1); },
    resetFont: resetFont,
    toggleContrast: toggleContrast,
    isHighContrast: function () { return highContrast; },
    canIncrease: function () { return fontIndex < steps.length - 1; },
    canDecrease: function () { return fontIndex > 0; },
    subscribe: function (fn) { subscribers.push(fn); }
  };
})(window.MF);
