/*
 * Resultado final: pontuação com mensagem acolhedora, resumo por tema (com atalho para rever
 * o tema em que errou) e a mensagem de encerramento oficial do Museu (que não é uma regra).
 */
(function (MF) {
  'use strict';

  MF.views = MF.views || {};
  var el = MF.dom.el;
  var icon = MF.dom.icon;

  function categoryIndex(categoryId) {
    for (var i = 0; i < MF.categories.length; i++) {
      if (MF.categories[i].id === categoryId) return i;
    }
    return 0;
  }

  function summaryItem(ctx, question, questionIndex) {
    var t = MF.i18n.t;
    var ok = MF.state.isCorrect(questionIndex);
    var category = MF.categories[categoryIndex(question.categoryId)];
    var title = t('cat.' + category.id + '.title');

    return el('li', { className: 'summary-item' }, [
      el('div', { className: 'summary-item__head' }, [icon(category.icon), el('span', { text: title })]),
      el('p', { className: 'summary-item__status summary-item__status--' + (ok ? 'ok' : 'review') },
        [icon(ok ? 'check' : 'info'), t(ok ? 'result.itemCorrect' : 'result.itemReview')]),
      ok ? null : el('button', {
        type: 'button',
        className: 'btn',
        onclick: function () { ctx.go({ name: 'card', index: categoryIndex(question.categoryId) + 1 }); }
      }, [icon('arrowLeft'), t('nav.reviewCategory', { title: title })])
    ]);
  }

  MF.views.result = function (ctx) {
    var t = MF.i18n.t;
    var score = MF.state.score();
    var total = MF.quiz.length;
    var messageKey = score === total ? 'result.msg.all' : (score >= Math.ceil(total / 2) ? 'result.msg.good' : 'result.msg.low');

    var node = el('section', { className: 'stack' }, [
      el('div', { className: 'score' }, [
        el('h1', { className: 'score__title', tabindex: '-1', dataset: { autofocus: '' }, text: t('result.title') }),
        el('p', { className: 'score__value', text: t('result.score', { score: score, total: total }) }),
        el('p', { className: 'score__msg', text: t(messageKey) })
      ]),
      el('div', null, [
        el('h2', { className: 'result__summary-title', text: t('result.summary') }),
        el('ul', { className: 'summary-list' }, MF.quiz.map(function (q, i) { return summaryItem(ctx, q, i); }))
      ]),
      el('div', { className: 'quote' }, [
        el('p', { className: 'quote__label', text: t('result.closingLabel') }),
        el('p', { className: 'quote__text', text: t('result.closing') })
      ]),
      el('div', { className: 'actions' }, [
        el('button', {
          type: 'button',
          className: 'btn',
          onclick: function () { ctx.go({ name: 'card', index: 1 }); }
        }, [icon('arrowLeft'), t('nav.reviewRules')]),
        el('button', {
          type: 'button',
          className: 'btn btn--primary',
          onclick: function () { MF.state.resetQuiz(); ctx.go({ name: 'quiz', index: 1 }); }
        }, [icon('refresh'), t('nav.retry')])
      ])
    ]);

    return { title: t('title.result'), node: node };
  };
})(window.MF);
