(() => {
  const root = document.documentElement;
  const decreaseButton = document.querySelector('[data-font-size="decrease"]');
  const increaseButton = document.querySelector('[data-font-size="increase"]');
  const contrastButton = document.querySelector(".contrast-toggle");
  let fontSizeStep = 0;
  let highContrastEnabled = false;

  const updateFontSize = () => {
    const sizes = {
      "-1": "smaller",
      "0": "normal",
      "1": "large",
      "2": "larger",
      "3": "largest",
    };

    root.dataset.fontSize = sizes[String(fontSizeStep)];
    decreaseButton.disabled = fontSizeStep <= -1;
    increaseButton.disabled = fontSizeStep >= 3;
  };

  const updateContrastLabel = () => {
    const language = root.dataset.language;
    const ui = window.museuI18n.translations[language].ui;
    contrastButton.setAttribute(
      "aria-label",
      ui[highContrastEnabled ? "accessibility.contrastOff" : "accessibility.contrastOn"],
    );
  };

  decreaseButton.addEventListener("click", () => {
    fontSizeStep = Math.max(-1, fontSizeStep - 1);
    updateFontSize();
  });

  increaseButton.addEventListener("click", () => {
    fontSizeStep = Math.min(3, fontSizeStep + 1);
    updateFontSize();
  });

  contrastButton.addEventListener("click", () => {
    highContrastEnabled = !highContrastEnabled;
    root.classList.toggle("high-contrast", highContrastEnabled);
    contrastButton.setAttribute("aria-pressed", String(highContrastEnabled));
    updateContrastLabel();
  });

  document.addEventListener("museu:languagechange", updateContrastLabel);
  updateFontSize();
  updateContrastLabel();
})();
