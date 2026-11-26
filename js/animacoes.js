(() => {
  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  const { gsap, ScrollTrigger } = window;
  const scrollProgress = document.querySelector(".page-scroll-progress__fill");
  const isQuizPage = document.documentElement.dataset.quizPage === "true";
  gsap.registerPlugin(ScrollTrigger);

  const motion = gsap.matchMedia();
  motion.add("(prefers-reduced-motion: no-preference)", () => {
    const cleanup = [];
    let workTriggers = [];

    const addCleanup = (eventName, handler) => {
      document.addEventListener(eventName, handler);
      cleanup.push(() => document.removeEventListener(eventName, handler));
    };

    if (scrollProgress) {
      gsap.to(scrollProgress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: true,
        },
      });
    }

    if (isQuizPage) {
      const questionCard = document.querySelector(".quiz-question-card");
      const resultCard = document.querySelector(".quiz-result");
      const options = document.querySelector("#quiz-options");

      gsap.fromTo(
        questionCard,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
      );

      const onQuestionChange = () => {
        gsap.fromTo(
          questionCard,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
        gsap.fromTo(
          options.children,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.24,
            stagger: 0.045,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      };

      const onQuizResult = () => {
        gsap.fromTo(
          resultCard,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      };

      addCleanup("museu:quizquestionchange", onQuestionChange);
      addCleanup("museu:quizresult", onQuizResult);

      const onOptionChange = (event) => {
        if (event.target.matches('input[name="quiz-answer"]')) {
          gsap.fromTo(
            event.target.closest(".quiz-option").querySelector(".quiz-option__marker"),
            { scale: 0.7 },
            { scale: 1, duration: 0.28, ease: "back.out(1.7)" },
          );
        }
      };
      options.addEventListener("change", onOptionChange);
      cleanup.push(() => options.removeEventListener("change", onOptionChange));
    } else {
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-logo", { opacity: 0, y: 24, duration: 0.75 })
        .from(".hero-button", { opacity: 0, y: 14, duration: 0.45 }, "-=0.32");

      gsap.from(".about-copy", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".about-image", {
        opacity: 0,
        x: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".works-heading", {
        opacity: 0,
        y: 24,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".works-heading",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".ticket-intro, .rules-reader", {
        opacity: 0,
        y: 22,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ticket-section",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      const animateWorkCards = () => {
        workTriggers.forEach((trigger) => trigger.kill());
        const cards = Array.from(document.querySelectorAll(".work-card"));
        if (!cards.length) {
          return;
        }

        gsap.set(cards, { opacity: 0, y: 24 });
        workTriggers = ScrollTrigger.batch(cards, {
          interval: 0.1,
          batchMax: 3,
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              overwrite: "auto",
            }),
        });
      };

      addCleanup("museu:worksrendered", animateWorkCards);
      animateWorkCards();

      const animateRuleChange = () => {
        const ruleCopy = document.querySelector(".rules-reader__rule-copy");
        const activeTab = document.querySelector(
          '.rules-reader__tab[aria-selected="true"]',
        );
        gsap.fromTo(
          ruleCopy,
          { opacity: 0.4, y: 8 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
        );
        if (activeTab) {
          gsap.fromTo(
            activeTab,
            { scale: 0.98 },
            { scale: 1, duration: 0.25, ease: "power2.out" },
          );
        }
      };
      addCleanup("museu:rulechange", animateRuleChange);
    }

    const interactiveSelector =
      ".hero-button, .ticket-start-button, .quiz-result__button, .quiz-actions__buttons button";
    const workCardSelector = ".work-card";

    const animateInteraction = (element, isActive) => {
      if (element.matches(workCardSelector)) {
        gsap.to(element, {
          scale: isActive ? 1.035 : 1,
          zIndex: isActive ? 2 : 0,
          duration: 0.24,
          ease: "power2.out",
          overwrite: "auto",
        });
        return;
      }

      if (!element.matches(interactiveSelector) || element.disabled) {
        return;
      }
      gsap.to(element, {
        scale: isActive ? 1.035 : 1,
        duration: 0.24,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onPointerOver = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      const element = event.target.closest(`${workCardSelector}, ${interactiveSelector}`);
      if (element && !element.contains(event.relatedTarget)) {
        animateInteraction(element, true);
      }
    };

    const onPointerOut = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      const element = event.target.closest(`${workCardSelector}, ${interactiveSelector}`);
      if (element && !element.contains(event.relatedTarget)) {
        animateInteraction(element, false);
      }
    };

    const onFocusIn = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      const element = event.target.closest(`${workCardSelector}, ${interactiveSelector}`);
      if (element) {
        animateInteraction(element, true);
      }
    };

    const onFocusOut = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      const element = event.target.closest(`${workCardSelector}, ${interactiveSelector}`);
      if (element && !element.contains(event.relatedTarget)) {
        animateInteraction(element, false);
      }
    };

    addCleanup("pointerover", onPointerOver);
    addCleanup("pointerout", onPointerOut);
    addCleanup("focusin", onFocusIn);
    addCleanup("focusout", onFocusOut);

    window.addEventListener("load", ScrollTrigger.refresh, { once: true });
    cleanup.push(() =>
      window.removeEventListener("load", ScrollTrigger.refresh),
    );

    return () => {
      cleanup.forEach((removeListener) => removeListener());
      workTriggers.forEach((trigger) => trigger.kill());
    };
  });
})();
