/*
 * Configuração geral da aplicação.
 * Cria o único objeto global (MF) usado por todos os scripts.
 * Scripts clássicos (sem módulos ES) para funcionar abrindo index.html direto do disco.
 */
window.MF = {
  config: {
    defaultLang: 'pt-BR',

    // Idiomas disponíveis. `short` é o texto do botão; `name` é o nome no próprio idioma.
    languages: [
      { code: 'pt-BR', short: 'PT', name: 'Português' },
      { code: 'en', short: 'EN', name: 'English' },
      { code: 'es', short: 'ES', name: 'Español' }
    ],

    // Página oficial de informações para visitação (link do rodapé).
    officialVisitUrl: 'https://www.museudasfavelas.org.br/visite/',

    // Aviso "versão preliminar, pendente de aprovação do Museu".
    // Mude para false quando o Museu aprovar traduções, descrições e quiz.
    showReviewNotice: true,

    // Mostra, nos espaços reservados, o texto que identifica qual imagem deve ser adicionada.
    // Mude para false quando todas as imagens institucionais estiverem no lugar.
    showPlaceholderLabels: true,

    // Controle de tamanho da fonte (multiplicador sobre o tamanho padrão do navegador).
    fontSteps: [0.9, 1, 1.15, 1.3, 1.5],
    defaultFontStepIndex: 1
  },

  // Preenchidos pelos demais arquivos:
  dictionaries: {}, // content/i18n/*.js
  icons: {},        // assets/icons/icons.js
  images: {},       // content/images.js
  categories: [],   // content/rules.js
  rules: {},        // content/rules.js
  quiz: []          // content/quiz.js
};
