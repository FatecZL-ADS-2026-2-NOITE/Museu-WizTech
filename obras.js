const obras = [
  {
    title: "Maria Beatriz Nascimento — Paulo Nazareth",
    description:
      "Escultura de aproximadamente seis metros de altura que homenageia a historiadora e intelectual Maria Beatriz Nascimento, destacando sua contribuição para a história afro-brasileira e a valorização da identidade negra.",
    image: "img/maria.webp",
    imageAlt: "Escultura de homenagem a Maria Beatriz Nascimento",
    imageSide: "right",
  },
  {
    title: "Faveleira — Babi Lopes",
    description:
      "Obra que representa a força, a ancestralidade e o afeto das mulheres negras, valorizando suas raízes culturais e sua importância na construção da identidade brasileira.",
    image: "img/faveleira.webp",
    imageAlt: "Obra Faveleira da artista Babi Lopes",
    imageSide: "left",
  },
  {
    title: "Raízes — Lídia Lisboa",
    description:
      "Instalação artística criada em parceria com os coletivos Tem Sentimento e Sin Fronteras, utilizando técnicas de crochê para representar a ancestralidade, a identidade e as raízes culturais das comunidades periféricas.",
    image: "img/raizes.webp",
    imageAlt: "Instalação de esculturas de crochê coloridas em uma sala de exposição",
    imageSide: "right",
  },
  {
    title: "Visão Periférica — Topográficas e Coletivo Coletores",
    description:
      "Instalação audiovisual que combina fotografias, vídeos, cores e sons para apresentar diferentes perspectivas sobre as periferias brasileiras, destacando as experiências, memórias e expressões culturais de seus moradores.",
    image: "img/visao.webp",
    imageAlt: "Instalação audiovisual sobre as periferias brasileiras",
    imageSide: "left",
  },
  {
    title: "Espelhos — Kayodê e Jailson de Souza e Silva",
    description:
      "Projeto que reúne produção sonora e texto para provocar reflexões sobre beleza, autoestima e identidade, questionando os padrões de beleza e os preconceitos associados às favelas.",
    image: "img/espelhos.webp",
    imageAlt: "Instalação artística do projeto Espelhos",
    imageSide: "right",
  },
];

const worksList = document.querySelector("#works-list");


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
