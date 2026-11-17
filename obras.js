const obras = [
  {
    title: "Raízes — Lídia Lisboa",
    description:
      "Instalação artística criada em parceria com coletivos de mulheres, utilizando técnicas de crochê para representar a ancestralidade, a identidade e as raízes culturais das comunidades periféricas.",
    image: "img/museum-scene-2.png",
    imageAlt: "Instalação de crochê colorida em uma sala de exposição",
    imageSide: "right",
  },
  {
    title: "Quebradinha — Marcelino Melo",
    description:
      "Conjunto de miniaturas de casas da periferia feitas com materiais recicláveis, representando a arquitetura e o cotidiano das comunidades.",
    image: "img/museum-scene-3.png",
    imageAlt: "Artista cria miniaturas de casas inspiradas na periferia",
    imageSide: "left",
  },
];

const worksList = document.querySelector("#works-list");

if (!worksList) {
  throw new Error("Não foi possível encontrar a lista de obras.");
}

obras.forEach((obra) => {
  const card = document.createElement("article");
  card.className = `work-card${obra.imageSide === "left" ? " work-card--image-left" : ""}`;

  const image = document.createElement("img");
  image.className = "work-card__image";
  image.src = obra.image;
  image.alt = obra.imageAlt;
  image.loading = "eager";

  const copy = document.createElement("div");
  copy.className = "work-card__copy";

  const title = document.createElement("h2");
  title.textContent = obra.title;

  const description = document.createElement("p");
  description.textContent = obra.description;

  copy.append(title, description);
  if (obra.imageSide === "left") {
    card.append(image, copy);
  } else {
    card.append(copy, image);
  }
  worksList.append(card);
});

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
