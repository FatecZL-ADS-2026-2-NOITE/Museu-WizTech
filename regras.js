(() => {
  const categoriesContainer = document.querySelector("#rules-categories");
  const panel = document.querySelector("#rules-panel");
  const positionLabel = document.querySelector("#rules-position");
  const categoryTitle = document.querySelector("#rules-category-title");
  const rulePosition = document.querySelector("#rules-rule-position");
  const placeholder = document.querySelector("#rules-placeholder");
  const acknowledgeCheckbox = document.querySelector("#rules-acknowledge");
  const acknowledgeLabel = document.querySelector(".rules-reader__acknowledgement");
  const progress = document.querySelector("#rules-progress");
  const progressFill = document.querySelector(".rules-reader__progress-fill");
  const progressText = document.querySelector("#rules-progress-text");
  const quizHint = document.querySelector("#rules-quiz-hint");
  const quizButton = document.querySelector("#ticket-start-button");
  const previousButton = document.querySelector("#rules-previous");
  const nextButton = document.querySelector("#rules-next");
  const previousRuleButton = document.querySelector("#rules-rule-previous");
  const nextRuleButton = document.querySelector("#rules-rule-next");
  let activeIndex = 0;
  let activeRuleIndex = 0;
  const acknowledgedCategories = new Set();
  let tabs = [];

  const getTranslations = () => {
    const language = document.documentElement.dataset.language;
    return window.museuI18n.translations[language];
  };

  const updateProgress = () => {
    const translation = getTranslations();
    const categories = translation.rules.categories;
    const acknowledgedCount = acknowledgedCategories.size;

    progress.setAttribute("aria-valuemax", String(categories.length));
    progress.setAttribute("aria-valuenow", String(acknowledgedCount));
    progressFill.style.width = `${(acknowledgedCount / categories.length) * 100}%`;
    progressText.textContent = translation.rules.progressText
      .replace("{acknowledged}", String(acknowledgedCount))
      .replace("{total}", String(categories.length));
    quizButton.disabled = acknowledgedCount !== categories.length;
    quizHint.textContent =
      acknowledgedCount === categories.length
        ? translation.rules.quizReady
        : translation.rules.quizLocked;

    tabs.forEach((tab, categoryIndex) => {
      const isComplete = acknowledgedCategories.has(categoryIndex);
      tab.classList.toggle("is-read", isComplete);
      tab.setAttribute(
        "aria-label",
        `${categories[categoryIndex]}, ${
          isComplete
            ? translation.rules.categoryComplete
            : translation.rules.categoryIncomplete
        }`,
      );
      tab.querySelector(".rules-reader__check").textContent =
        isComplete ? "✓" : "";
    });
  };

  const selectCategory = (index, shouldFocus = false) => {
    const translation = getTranslations();
    const categories = translation.rules.categories;
    if (index !== activeIndex) {
      activeRuleIndex = 0;
    }
    activeIndex = index;

    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activeIndex;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panel.setAttribute("aria-labelledby", `rules-tab-${activeIndex + 1}`);
    positionLabel.textContent = translation.rules.categoryPosition.replace(
      "{current}",
      String(activeIndex + 1),
    );
    categoryTitle.textContent = categories[activeIndex];

    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === categories.length - 1;
    updateRule();

    if (shouldFocus) {
      tabs[activeIndex].focus();
    }
  };

  const updateRule = () => {
    const rules = getTranslations().rules.rulePlaceholders;
    rulePosition.textContent = getTranslations().rules.rulePosition
      .replace("{current}", String(activeRuleIndex + 1))
      .replace("{total}", String(rules.length));
    placeholder.textContent = rules[activeRuleIndex];
    acknowledgeCheckbox.checked = acknowledgedCategories.has(activeIndex);
    acknowledgeLabel.hidden = activeRuleIndex !== rules.length - 1;
    previousRuleButton.disabled = activeRuleIndex === 0;
    nextRuleButton.disabled = activeRuleIndex === rules.length - 1;
    updateProgress();
  };

  const renderCategories = () => {
    const categories = getTranslations().rules.categories;
    categoriesContainer.replaceChildren();
    tabs = categories.map((name, index) => {
      const tab = document.createElement("button");
      tab.className = "rules-reader__tab";
      tab.id = `rules-tab-${index + 1}`;
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "rules-panel");

      const number = document.createElement("span");
      number.className = "rules-reader__number";
      number.setAttribute("aria-hidden", "true");
      number.textContent = String(index + 1).padStart(2, "0");

      const label = document.createElement("span");
      label.className = "rules-reader__tab-label";
      label.textContent = name;

      const check = document.createElement("span");
      check.className = "rules-reader__check";
      check.setAttribute("aria-hidden", "true");

      tab.append(number, label, check);
      tab.addEventListener("click", () => selectCategory(index));
      categoriesContainer.append(tab);
      return tab;
    });

    selectCategory(activeIndex);
  };

  categoriesContainer.addEventListener("keydown", (event) => {
    let targetIndex = activeIndex;
    const lastIndex = tabs.length - 1;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      targetIndex = (activeIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      targetIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      targetIndex = 0;
    } else if (event.key === "End") {
      targetIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    selectCategory(targetIndex, true);
  });

  previousButton.addEventListener("click", () => {
    if (activeIndex > 0) {
      selectCategory(activeIndex - 1);
    }
  });

  nextButton.addEventListener("click", () => {
    if (activeIndex < tabs.length - 1) {
      selectCategory(activeIndex + 1);
    }
  });

  previousRuleButton.addEventListener("click", () => {
    if (activeRuleIndex > 0) {
      activeRuleIndex -= 1;
      updateRule();
    }
  });

  nextRuleButton.addEventListener("click", () => {
    const ruleCount = getTranslations().rules.rulePlaceholders.length;
    if (activeRuleIndex < ruleCount - 1) {
      activeRuleIndex += 1;
      updateRule();
    }
  });

  acknowledgeCheckbox.addEventListener("change", () => {
    if (acknowledgeCheckbox.checked) {
      acknowledgedCategories.add(activeIndex);
    } else {
      acknowledgedCategories.delete(activeIndex);
    }
    updateProgress();
  });

  quizButton.addEventListener("click", () => {
    if (!quizButton.disabled) {
      window.location.assign("quiz.html");
    }
  });

  document.addEventListener("museu:languagechange", renderCategories);
  renderCategories();
})();
