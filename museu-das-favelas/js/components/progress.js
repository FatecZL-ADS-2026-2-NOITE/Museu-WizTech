/*
 * Indicador de progresso: texto visível ("Etapa 2 de 5") + barra segmentada.
 * Para leitores de tela, a barra expõe role="progressbar" com aria-valuetext.
 */
(function (MF) {
  'use strict';

  MF.components = MF.components || {};
  var el = MF.dom.el;

  /**
   * @param {Object} opts  { labelKey, textKey, current, total }  (current começa em 1)
   */
  function progress(opts) {
    var t = MF.i18n.t;
    var text = t(opts.textKey, { current: opts.current, total: opts.total });
    var segments = [];

    for (var i = 1; i <= opts.total; i++) {
      var state = i < opts.current ? ' is-done' : (i === opts.current ? ' is-current' : '');
      segments.push(el('span', { className: 'progress__seg' + state }));
    }

    return el('div', { className: 'progress' }, [
      el('p', { className: 'progress__label', 'aria-hidden': 'true', text: text }),
      el('div', {
        className: 'progress__bar',
        role: 'progressbar',
        'aria-label': t(opts.labelKey),
        'aria-valuemin': 1,
        'aria-valuemax': opts.total,
        'aria-valuenow': opts.current,
        'aria-valuetext': text
      }, segments)
    ]);
  }

  MF.components.progress = progress;
})(window.MF);
