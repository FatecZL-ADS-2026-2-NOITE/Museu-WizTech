(() => {
  const questionCount = 5;
  const passingScore = 3;
  const ticketUrl = "https://www.sympla.com.br/produtor/museudasfavelas";
  // Temporary answer key for the placeholder questions.
  const correctOptions = [0, 1, 2, 0, 1];
  const answers = Array(questionCount).fill(null);

  const progressCard = document.querySelector(".quiz-progress-card");
  const progressValue = document.querySelector(".quiz-progress-card__heading strong");
  const progressBar = document.querySelector(".quiz-progress");
  const progressFill = document.querySelector(".quiz-progress__fill");
  const questionCard = document.querySelector(".quiz-question-card");
  const questionNumber = document.querySelector(".quiz-question-card__number");
  const questionLabel = document.querySelector(".quiz-question-card__label");
  const questionHeading = document.querySelector("#quiz-question");
  const optionsList = document.querySelector("#quiz-options");
  const feedback = document.querySelector("#quiz-feedback");
  const actions = document.querySelector(".quiz-actions");
  const previousButton = actions.querySelector("button:first-child");
  const nextButton = actions.querySelector("button:last-child");
  const resultSection = document.querySelector("#quiz-result");
  const resultTitle = document.querySelector("#quiz-result-title");
  const resultScore = document.querySelector("#quiz-result-score");
  const resultMessage = document.querySelector("#quiz-result-message");
  const resultActions = document.querySelector("#quiz-result-actions");
  let currentIndex = 0;
  let finished = false;

  const getUi = () => {
    const language = document.documentElement.dataset.language;
    return window.museuI18n.translations[language].ui;
  };

  const format = (template, values) =>
    Object.entries(values).reduce(
      (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
      template,
    );

  const updateProgress = (index) => {
    const current = index + 1;
    progressValue.textContent = format(getUi()["quiz.progressValue"], {
      current,
      total: questionCount,
    });
    progressBar.setAttribute("aria-valuenow", String(current));
    progressFill.style.width = `${(current / questionCount) * 100}%`;
  };

  const updateOptions = () => {
    const selectedOption = answers[currentIndex];
    const correctOption = correctOptions[currentIndex];

    optionsList.querySelectorAll("input[type=radio]").forEach((input) => {
      const optionIndex = Number(input.value);
      const label = input.closest(".quiz-option");
      input.checked = selectedOption === optionIndex;
      input.disabled = selectedOption !== null;
      label.classList.toggle("is-selected", selectedOption === optionIndex);
      label.classList.toggle("is-locked", selectedOption !== null);
      label.classList.toggle(
        "is-correct",
        selectedOption !== null && optionIndex === correctOption,
      );
      label.classList.toggle(
        "is-incorrect",
        selectedOption !== null &&
          selectedOption === optionIndex &&
          selectedOption !== correctOption,
      );
    });

    feedback.dataset.state =
      selectedOption === null
        ? ""
        : selectedOption === correctOption
          ? "correct"
          : "incorrect";
    feedback.textContent =
      selectedOption === null
        ? ""
        : getUi()[
            selectedOption === correctOption
              ? "quiz.feedbackCorrect"
              : "quiz.feedbackIncorrect"
          ];
    nextButton.disabled = selectedOption === null;
  };

  const renderOptions = () => {
    const ui = getUi();
    const optionKeys = ["quiz.option1", "quiz.option2", "quiz.option3"];
    const questionIndex = currentIndex;
    optionsList.replaceChildren();

    optionKeys.forEach((key, optionIndex) => {
      const item = document.createElement("li");
      const label = document.createElement("label");
      const input = document.createElement("input");
      const marker = document.createElement("span");
      const text = document.createElement("span");

      label.className = "quiz-option";
      input.type = "radio";
      input.name = "quiz-answer";
      input.value = String(optionIndex);
      input.addEventListener("change", () => {
        if (answers[questionIndex] !== null) {
          return;
        }
        answers[questionIndex] = optionIndex;
        updateOptions();
      });

      marker.className = "quiz-option__marker";
      marker.setAttribute("aria-hidden", "true");
      text.textContent = ui[key];
      label.append(input, marker, text);
      item.append(label);
      optionsList.append(item);
    });

    updateOptions();
  };

  const renderQuestion = () => {
    const ui = getUi();
    const current = currentIndex + 1;
    updateProgress(currentIndex);
    questionNumber.textContent = String(current).padStart(2, "0");
    questionLabel.textContent = format(ui["quiz.questionLabel"], { current });
    questionHeading.textContent = format(ui["quiz.questionPlaceholder"], { current });
    previousButton.textContent = ui["quiz.previous"];
    previousButton.disabled = currentIndex === 0;
    nextButton.textContent =
      currentIndex === questionCount - 1
        ? ui["quiz.finish"]
        : ui["quiz.next"];
    progressCard.hidden = false;
    questionCard.hidden = false;
    resultSection.hidden = true;
    actions.hidden = false;
    renderOptions();
  };

  const createResultLink = (href, label, isPrimary, openInNewTab = false) => {
    const link = document.createElement("a");
    link.className = `quiz-result__button${isPrimary ? " quiz-result__button--primary" : ""}`;
    link.href = href;
    link.textContent = label;
    if (openInNewTab) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    return link;
  };

  const showResult = () => {
    const ui = getUi();
    const score = answers.reduce(
      (total, answer, index) => total + Number(answer === correctOptions[index]),
      0,
    );
    const passed = score >= passingScore;

    finished = true;
    updateProgress(questionCount - 1);
    progressCard.hidden = true;
    questionCard.hidden = true;
    actions.hidden = true;
    resultSection.hidden = false;
    resultTitle.textContent = ui["quiz.resultTitle"];
    resultScore.textContent = format(ui["quiz.score"], {
      score,
      total: questionCount,
    });
    resultMessage.textContent = format(
      ui[passed ? "quiz.passMessage" : "quiz.failMessage"],
      { score, total: questionCount, minimum: passingScore },
    );
    resultActions.replaceChildren();

    if (passed) {
      resultActions.append(
        createResultLink(ticketUrl, ui["quiz.buyTickets"], true, true),
      );
      return;
    }

    resultActions.append(
      createResultLink("index.html#ingresso", ui["quiz.reviewRules"], false),
    );
    const retryButton = document.createElement("button");
    retryButton.className = "quiz-result__button quiz-result__button--primary";
    retryButton.type = "button";
    retryButton.textContent = ui["quiz.retry"];
    retryButton.addEventListener("click", restart);
    resultActions.append(retryButton);
  };

  const restart = () => {
    answers.fill(null);
    currentIndex = 0;
    finished = false;
    renderQuestion();
    questionHeading.focus();
  };

  previousButton.addEventListener("click", () => {
    if (currentIndex > 0 && !finished) {
      currentIndex -= 1;
      renderQuestion();
      questionHeading.focus();
    }
  });

  nextButton.addEventListener("click", () => {
    if (answers[currentIndex] === null || finished) {
      return;
    }
    if (currentIndex === questionCount - 1) {
      showResult();
      resultTitle.focus();
      return;
    }
    currentIndex += 1;
    renderQuestion();
    questionHeading.focus();
  });

  document.addEventListener("museu:languagechange", () => {
    if (finished) {
      showResult();
    } else {
      renderQuestion();
    }
  });

  renderQuestion();
})();
