const obras = [
  {
    key: "maria",
    image: "img/maria.webp",
    imageSide: "right",
  },
  {
    key: "faveleira",
    image: "img/faveleira.webp",
    imageSide: "left",
  },
  {
    key: "raizes",
    image: "img/raizes.webp",
    imageSide: "right",
  },
  {
    key: "visao",
    image: "img/visao.webp",
    imageSide: "left",
  },
  {
    key: "espelhos",
    image: "img/espelhos.webp",
    imageSide: "right",
  },
];

const worksList = document.querySelector("#works-list");

const renderWorks = (language) => {
  const localizedWorks = window.museuI18n.translations[language].works;
  worksList.replaceChildren();

  obras.forEach((obra) => {
    const localized = localizedWorks[obra.key];
    const card = document.createElement("article");
    card.className = `work-card${obra.imageSide === "left" ? " work-card--image-left" : ""}`;

    const image = document.createElement("img");
    image.className = "work-card__image";
    image.src = obra.image;
    image.alt = localized.imageAlt;
    image.loading = "eager";

    const copy = document.createElement("div");
    copy.className = "work-card__copy";

    const title = document.createElement("h2");
    title.textContent = localized.title;

    const description = document.createElement("p");
    description.textContent = localized.description;

    copy.append(title, description);
    if (obra.imageSide === "left") {
      card.append(image, copy);
    } else {
      card.append(copy, image);
    }
    worksList.append(card);
  });
};

document.addEventListener("museu:languagechange", (event) => {
  renderWorks(event.detail.language);
});
renderWorks(document.documentElement.dataset.language);

const header = document.querySelector(".site-header");
const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
let scrollFrame = null;

const updateCurrentSection = () => {
  scrollFrame = null;
  const activationY =
    header.getBoundingClientRect().height + Math.min(48, window.innerHeight * 0.1);
  const currentSection = sections
    .filter((section) => section.getBoundingClientRect().top <= activationY)
    .pop();

  navLinks.forEach((link) => {
    const isCurrent = currentSection && link.hash === `#${currentSection.id}`;
    link.classList.toggle("is-current", Boolean(isCurrent));
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame === null) {
      scrollFrame = window.requestAnimationFrame(updateCurrentSection);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateCurrentSection);
updateCurrentSection();
