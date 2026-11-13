/*
 * Quiz: apresentação e perguntas de múltipla escolha.
 * Feedback imediato (ícone + texto, nunca só cor) com explicação baseada no regulamento.
 * Sem tempo limite. Respostas ficam guardadas por índice, então trocar de idioma não as perde.
 */
(function (MF) {
  'use strict';

  MF.views = MF.views || {};
  var el = MF.dom.el;
  var icon = MF.dom.icon;

  function backButton(label, onclick) {
    return el('button', { type: 'button', className: 'btn', onclick: onclick }, [icon('arrowLeft'), label]);
  }

  MF.views.quizIntro = function (ctx) {
    var t = MF.i18n.t;

    var node = el('section', { className: 'panel' }, [
      el('h1', { className: 'panel__title', tabindex: '-1', dataset: { autofocus: '' }, text: t('quizIntro.title') }),
      el('p', { className: 'panel__text', text: t('quizIntro.text', { total: MF.quiz.length }) }),
      el('div', { className: 'actions' }, [
        backButton(t('nav.back'), function () { ctx.go({ name: 'card', index: MF.categories.length }); }),
        el('button', {
          type: 'button',
          className: 'btn btn--primary',
          onclick: function () { ctx.go({ name: 'quiz', index: 1 }); }
        }, [t('nav.startQuiz'), icon('arrowRight')])
      ])
    ]);

    return { title: t('title.quizIntro'), node: node };
  };

  function optionButton(ctx, question, questionIndex, optionIndex) {
    var t = MF.i18n.t;
    var chosen = MF.state.getAnswer(questionIndex);
    var answered = chosen !== null;
    var isCorrect = optionIndex === question.correct;
    var isChosen = chosen === optionIndex;

    var stateClass = '';
    var stateText = null;
    if (answered) {
      if (isCorrect) stateClass = ' is-correct';
      else if (isChosen) stateClass = ' is-wrong';
      else stateClass = ' is-dim';

      if (isChosen && isCorrect) stateText = t('quiz.yourAnswer') + '. ' + t('quiz.correctAnswer');
      else if (isCorrect) stateText = t('quiz.correctAnswer');
      else if (isChosen) stateText = t('quiz.yourAnswer');
    }

    var mark = null;
    if (answered && (isCorrect || isChosen)) {
      mark = icon(isCorrect ? 'check' : 'x');
      mark.classList.add('option__mark');
    }

    return el('button', {
      type: 'button',
      className: 'option' + stateClass,
      'aria-disabled': answered ? 'true' : null,
      onclick: function () {
        if (answered) return;
        MF.state.setAnswer(questionIndex, optionIndex);
        ctx.refresh('answer');
      }
    }, [
      el('span', { className: 'option__text', text: t('quiz.' + question.id + '.o' + (optionIndex + 1)) }),
      stateText ? el('span', { className: 'option__state', text: stateText }) : null,
      mark
    ]);
  }

  function feedback(question, questionIndex, focusIt) {
    var t = MF.i18n.t;
    var ok = MF.state.isCorrect(questionIndex);

    return el('section', {
      className: 'feedback feedback--' + (ok ? 'correct' : 'incorrect'),
      role: 'group',
      tabindex: '-1',
      'aria-labelledby': 'feedback-title',
      'aria-describedby': 'feedback-text',
      dataset: focusIt ? { autofocus: '' } : {}
    }, [
      el('h2', { id: 'feedback-title', className: 'feedback__title' },
        [icon(ok ? 'check' : 'info'), t(ok ? 'quiz.correct' : 'quiz.incorrect')]),
      el('p', { className: 'feedback__label', text: t('quiz.explanationLabel') }),
      el('p', { id: 'feedback-text', className: 'feedback__text', text: t('quiz.' + question.id + '.explain') })
    ]);
  }

  MF.views.quiz = function (ctx) {
    var t = MF.i18n.t;
    var questionIndex = ctx.route.index - 1;
    var question = MF.quiz[questionIndex];
    var answered = MF.state.getAnswer(questionIndex) !== null;
    var isLast = questionIndex === MF.quiz.length - 1;
    var focusFeedback = ctx.reason === 'answer';

    var options = [0, 1, 2].map(function (i) {
      return el('li', null, optionButton(ctx, question, questionIndex, i));
    });

    var buttons = [
      backButton(t('nav.back'), function () {
        ctx.go(questionIndex === 0 ? { name: 'quizIntro' } : { name: 'quiz', index: questionIndex });
      })
    ];
    if (answered) {
      buttons.push(el('button', {
        type: 'button',
        className: 'btn btn--primary',
        onclick: function () {
          ctx.go(isLast ? { name: 'result' } : { name: 'quiz', index: questionIndex + 2 });
        }
      }, [t(isLast ? 'nav.seeResult' : 'nav.nextQuestion'), icon('arrowRight')]));
    }

    var node = el('section', null, [
      MF.components.progress({
        labelKey: 'progress.quizLabel',
        textKey: 'progress.question',
        current: ctx.route.index,
        total: MF.quiz.length
      }),
      el('h1', {
        className: 'quiz__prompt',
        tabindex: '-1',
        dataset: focusFeedback ? {} : { autofocus: '' },
        text: t('quiz.' + question.id + '.prompt')
      }),
      el('ul', { className: 'options', 'aria-label': t('quiz.optionsAria') }, options),
      answered ? feedback(question, questionIndex, focusFeedback) : null,
      el('div', { className: 'actions' }, buttons)
    ]);

    return { title: t('title.quiz', { current: ctx.route.index }), node: node };
  };
})(window.MF);
