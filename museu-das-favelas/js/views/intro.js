/*
 * Tela inicial: apresentação acolhedora do Museu, com espaço reservado para imagem institucional.
 * Todas as telas retornam { title, node }; o elemento com data-autofocus recebe o foco ao navegar.
 */
(function (MF) {
  'use strict';

  MF.views = MF.views || {};
  var el = MF.dom.el;

  MF.views.intro = function (ctx) {
    var t = MF.i18n.t;

    var node = el('section', { className: 'intro' }, [
      MF.components.imageSlot('intro'),
      el('h1', { className: 'intro__title', tabindex: '-1', dataset: { autofocus: '' }, text: t('intro.title') }),
      el('p', { className: 'intro__lead', text: t('intro.lead') }),
      el('p', { className: 'intro__text', text: t('intro.text') }),
      el('p', { className: 'intro__meta', text: t('intro.meta', { steps: MF.categories.length }) }),
      el('button', {
        type: 'button',
        className: 'btn btn--primary btn--block',
        onclick: function () { ctx.go({ name: 'card', index: 1 }); }
      }, [t('intro.start'), MF.dom.icon('arrowRight')])
    ]);

    return { title: t('title.intro'), node: node };
  };
})(window.MF);
