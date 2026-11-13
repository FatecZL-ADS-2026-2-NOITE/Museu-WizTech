/*
 * Estado da sessão do visitante (somente em memória; nada é salvo no dispositivo).
 *  - acked:   quais etapas (índices) o visitante marcou como "Entendi"
 *  - answers: índice da alternativa escolhida em cada pergunta (null = não respondida)
 * Idioma e posição no percurso ficam na URL (ver router.js), não aqui.
 */
(function (MF) {
  'use strict';

  var state = {
    acked: {},
    answers: MF.quiz.map(function () { return null; })
  };

  MF.state = {
    isAcked: function (stepIndex) { return state.acked[stepIndex] === true; },
    ack: function (stepIndex) { state.acked[stepIndex] = true; },

    getAnswer: function (questionIndex) { return state.answers[questionIndex]; },
    setAnswer: function (questionIndex, optionIndex) { state.answers[questionIndex] = optionIndex; },
    resetQuiz: function () { state.answers = MF.quiz.map(function () { return null; }); },

    isCorrect: function (questionIndex) {
      return state.answers[questionIndex] === MF.quiz[questionIndex].correct;
    },
    score: function () {
      return MF.quiz.filter(function (q, i) { return state.answers[i] === q.correct; }).length;
    },
    allAnswered: function () {
      return state.answers.every(function (a) { return a !== null; });
    }
  };
})(window.MF);
