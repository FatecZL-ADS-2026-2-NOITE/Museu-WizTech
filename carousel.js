(() => {
  const hero = document.querySelector(".hero");
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const controls = Array.from(document.querySelectorAll(".hero-progress button"));

  if (!hero || slides.length !== controls.length || slides.length < 2) {
    throw new Error("O carrossel precisa ter pelo menos dois slides e um botão por slide.");
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const intervalDuration = 5000;
  let activeIndex = 0;
  let autoplayTimer = null;
  let pointerOver = false;
  let pointerInteraction = false;
  let hasFocus = false;

  const showSlide = (index) => {
    activeIndex = index;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      controls[slideIndex].classList.toggle("is-active", isActive);
      controls[slideIndex].setAttribute("aria-pressed", String(isActive));
    });
  };

  const updateAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;

    if (reducedMotion.matches || pointerOver || hasFocus || document.hidden) {
      return;
    }

    autoplayTimer = window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, intervalDuration);
  };

  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      showSlide(index);
      updateAutoplay();
    });
  });

  hero.addEventListener("pointerdown", () => {
    pointerInteraction = true;
  });

  hero.addEventListener("pointerenter", () => {
    pointerOver = true;
    updateAutoplay();
  });

  hero.addEventListener("pointerleave", () => {
    pointerOver = false;
    if (pointerInteraction) {
      hasFocus = false;
    }
    pointerInteraction = false;
    updateAutoplay();
  });

  hero.addEventListener("focusin", () => {
    if (!pointerInteraction) {
      hasFocus = true;
      updateAutoplay();
    }
  });

  hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) {
      hasFocus = false;
      updateAutoplay();
    }
  });

  document.addEventListener("visibilitychange", updateAutoplay);
  reducedMotion.addEventListener("change", updateAutoplay);
  updateAutoplay();
})();
