/*
 * Etapas do percurso: um cartão por categoria.
 * O visitante toca em "Entendi" para liberar "Próximo". "Voltar" está sempre disponível.
 * Todo o conteúdo fica visível desde o início (nada escondido atrás de "virar o cartão").
 */
(function (MF) {
  'use strict';

  MF.views = MF.views || {};
  var el = MF.dom.el;
  var icon = MF.dom.icon;

  function ruleItem(ruleId) {
    var rule = MF.rules[ruleId];
    var iconName = rule.type === 'permission' ? 'check' : 'info';
    return el('li', { className: 'rule' }, [
      el('span', { className: 'rule__mark rule__mark--' + rule.type }, icon(iconName)),
      el('p', { className: 'rule__text', text: MF.i18n.t('rule.' + ruleId) })
    ]);
  }

  MF.views.card = function (ctx) {
    var t = MF.i18n.t;
    var stepIndex = ctx.route.index - 1;
    var total = MF.categories.length;
    var category = MF.categories[stepIndex];
    var acked = MF.state.isAcked(stepIndex);
    var isLast = stepIndex === total - 1;
    var focusNext = ctx.reason === 'ack';
    var title = t('cat.' + category.id + '.title');

    // Botão "Entendi": depois de tocado, vira um estado de confirmação.
    var understood = acked
      ? el('button', { type: 'button', className: 'btn btn--done btn--block', 'aria-disabled': 'true' },
          [icon('check'), t('nav.understoodDone')])
      : el('button', {
          type: 'button',
          className: 'btn btn--primary btn--block',
          onclick: function () {
            MF.state.ack(stepIndex);
            MF.a11y.announce(t('nav.understoodAnnounce'));
            ctx.refresh('ack');
          }
        }, t('nav.understood'));

    var card = el('article', { className: 'card' }, [
      MF.components.imageSlot(category.id, { variant: 'card' }),
      el('div', { className: 'card__body' }, [
        el('div', { className: 'card__head' }, [
          el('span', { className: 'card__badge' }, icon(category.icon)),
          el('h1', {
            className: 'card__title',
            tabindex: '-1',
            dataset: focusNext ? {} : { autofocus: '' },
            text: title
          })
        ]),
        el('p', { className: 'card__desc', text: t('cat.' + category.id + '.desc') }),
        el('ul', { className: 'rule-list', 'aria-label': t('card.rulesAria') }, category.ruleIds.map(ruleItem)),
        understood
      ])
    ]);

    var back = el('button', {
      type: 'button',
      className: 'btn',
      onclick: function () {
        ctx.go(stepIndex === 0 ? { name: 'intro' } : { name: 'card', index: stepIndex });
      }
    }, [icon('arrowLeft'), t('nav.back')]);

    var next = el('button', {
      type: 'button',
      className: 'btn btn--primary',
      'aria-disabled': acked ? null : 'true',
      'aria-describedby': acked ? null : 'next-hint',
      dataset: focusNext ? { autofocus: '' } : {},
      onclick: function () {
        if (!acked) { MF.a11y.announce(t('nav.hintLocked')); return; }
        ctx.go(isLast ? { name: 'quizIntro' } : { name: 'card', index: stepIndex + 2 });
      }
    }, [t(isLast ? 'nav.toQuiz' : 'nav.next'), icon('arrowRight')]);

    var actions = el('div', { className: 'actions' }, [
      acked ? null : el('p', { id: 'next-hint', className: 'actions__hint', text: t('nav.hintLocked') }),
      back,
      next
    ]);

    var node = el('section', null, [
      MF.components.progress({
        labelKey: 'progress.rulesLabel',
        textKey: 'progress.step',
        current: ctx.route.index,
        total: total
      }),
      card,
      actions
    ]);

    return { title: t('title.card', { current: ctx.route.index, title: title }), node: node };
  };
})(window.MF);
