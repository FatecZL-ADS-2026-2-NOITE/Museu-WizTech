const obras = [
  {
    key: "maria",
    title: "Maria Beatriz Nascimento — Paulo Nazareth",
    description:
      "Escultura de aproximadamente seis metros de altura que homenageia a historiadora e intelectual Maria Beatriz Nascimento, destacando sua contribuição para a história afro-brasileira e a valorização da identidade negra.",
    image: "img/maria.webp",
    imageAlt: "Escultura de homenagem a Maria Beatriz Nascimento",
    imageSide: "right",
  },
  {
    key: "faveleira",
    title: "Faveleira — Babi Lopes",
    description:
      "Obra que representa a força, a ancestralidade e o afeto das mulheres negras, valorizando suas raízes culturais e sua importância na construção da identidade brasileira.",
    image: "img/faveleira.webp",
    imageAlt: "Obra Faveleira da artista Babi Lopes",
    imageSide: "left",
  },
  {
    key: "raizes",
    title: "Raízes — Lídia Lisboa",
    description:
      "Instalação artística criada em parceria com os coletivos Tem Sentimento e Sin Fronteras, utilizando técnicas de crochê para representar a ancestralidade, a identidade e as raízes culturais das comunidades periféricas.",
    image: "img/raizes.webp",
    imageAlt: "Instalação de esculturas de crochê coloridas em uma sala de exposição",
    imageSide: "right",
  },
  {
    key: "visao",
    title: "Visão Periférica — Topográficas e Coletivo Coletores",
    description:
      "Instalação audiovisual que combina fotografias, vídeos, cores e sons para apresentar diferentes perspectivas sobre as periferias brasileiras, destacando as experiências, memórias e expressões culturais de seus moradores.",
    image: "img/visao.webp",
    imageAlt: "Instalação audiovisual sobre as periferias brasileiras",
    imageSide: "left",
  },
  {
    key: "espelhos",
    title: "Espelhos — Kayodê e Jailson de Souza e Silva",
    description:
      "Projeto que reúne produção sonora e texto para provocar reflexões sobre beleza, autoestima e identidade, questionando os padrões de beleza e os preconceitos associados às favelas.",
    image: "img/espelhos.webp",
    imageAlt: "Instalação artística do projeto Espelhos",
    imageSide: "right",
  },
  {
    key: "naoSouDaqui",
    title: "Não sou daqui — Oga Mendonça",
    description:
      "Instalação que provoca reflexões sobre pertencimento, identidade e as relações entre as pessoas e os lugares onde vivem.",
    image: "img/naoSouDaqui.webp",
    imageAlt: "Instalação Não sou daqui",
    imageSide: "left",
  },
  {
    key: "beco",
    title: "Beco — Oga Mendonça",
    description:
      "Instalação que representa os becos e caminhos das favelas, destacando os espaços de circulação, convivência e construção da vida comunitária.",
    image: "img/beco.webp",
    imageAlt: "Instalação Beco",
    imageSide: "right",
  },
  {
    key: "paraAlemDosNumeros",
    title: "Para além dos números — Coletivo Coletores e Marcela Marcucci",
    description:
      "Videomapping que utiliza imagens e dados para refletir sobre as favelas, mostrando as histórias e experiências humanas que não podem ser reduzidas a estatísticas.",
    image: "img/paraAlemDosNumeros.webp",
    imageAlt: "Videomapping Para além dos números",
    imageSide: "left",
  },
  {
    key: "filhoMestico",
    title: "Ato 0 – Filho Mestiço — O tal do Ale",
    description:
      "Obra da série Histórias em caixas que aborda identidade, memória e experiências pessoais, relacionando histórias individuais com questões sociais e culturais.",
    image: "img/filhoMestico.webp",
    imageAlt: "Obra Ato 0 Filho Mestiço da série Histórias em caixas",
    imageSide: "right",
  },
];

const worksList = document.querySelector("#works-list");

const renderWorks = (language) => {
  const localizedWorks = window.museuI18n.translations[language].works;
  worksList.replaceChildren();

  obras.forEach((obra) => {
    const localized = localizedWorks[obra.key] || obra;
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
  document.dispatchEvent(new CustomEvent("museu:worksrendered"));
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
