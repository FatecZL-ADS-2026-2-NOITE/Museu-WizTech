/*
 * Espaços reservados para imagens institucionais.
 *
 * Para trocar um espaço reservado por uma imagem real:
 *   1. Copie o arquivo para assets/images/ (nomes sugeridos abaixo).
 *   2. Troque `src: null` por o caminho, por exemplo 'assets/images/intro.jpg'.
 *   3. Revise o texto alternativo (chave `altKey`) nos três arquivos de content/i18n/
 *      para que descreva exatamente a imagem escolhida.
 *
 * Enquanto `src` for null, aparece um espaço reservado com o rótulo (`labelKey`).
 * Se o arquivo informado não existir, o espaço reservado volta a aparecer
 * (nunca fica uma imagem quebrada).
 *
 * ratio: proporção reservada (largura / altura) para que a página não "pule" ao carregar.
 */
MF.images = {
  logo: {
    src: null, // sugerido: 'assets/images/logo.svg' (versão em fundo claro)
    srcHighContrast: null, // sugerido: 'assets/images/logo-negativo.svg' (fundo escuro)
    ratio: '4 / 1',
    labelKey: 'img.logo.label',
    altKey: 'img.logo.alt'
  },
  intro: {
    src: null, // sugerido: 'assets/images/intro.jpg'
    ratio: '4 / 3',
    labelKey: 'img.intro.label',
    altKey: 'img.intro.alt'
  },
  pode: {
    src: null, // sugerido: 'assets/images/categoria-pode.jpg'
    ratio: '16 / 9',
    labelKey: 'img.pode.label',
    altKey: 'img.pode.alt'
  },
  convivencia: {
    src: null, // sugerido: 'assets/images/categoria-convivencia.jpg'
    ratio: '16 / 9',
    labelKey: 'img.convivencia.label',
    altKey: 'img.convivencia.alt'
  },
  fotos: {
    src: null, // sugerido: 'assets/images/categoria-fotos.jpg'
    ratio: '16 / 9',
    labelKey: 'img.fotos.label',
    altKey: 'img.fotos.alt'
  },
  pertences: {
    src: null, // sugerido: 'assets/images/categoria-pertences.jpg'
    ratio: '16 / 9',
    labelKey: 'img.pertences.label',
    altKey: 'img.pertences.alt'
  },
  criancas: {
    src: null, // sugerido: 'assets/images/categoria-criancas.jpg'
    ratio: '16 / 9',
    labelKey: 'img.criancas.label',
    altKey: 'img.criancas.alt'
  }
};
