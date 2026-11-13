/*
 * Quiz (estrutura neutra de idioma). Os textos ficam em content/i18n/*.js:
 *   quiz.<id>.prompt | quiz.<id>.o1 | o2 | o3 | quiz.<id>.explain
 *
 * `correct` é o ÍNDICE (0, 1 ou 2) da alternativa correta.
 * O estado guarda índices, não textos, então trocar de idioma no meio do quiz não perde as respostas.
 *
 * Regras de conteúdo (Fase 2):
 *  - Cada pergunta usa só informações apresentadas no percurso (regulamento oficial).
 *  - Alternativas erradas não criam regras novas: contradizem o que o percurso diz ou
 *    usam atividades que o próprio regulamento permite.
 *  - Os textos do quiz são versão preliminar, pendente de aprovação do Museu.
 */
MF.quiz = [
  { id: 'q1', categoryId: 'pode',        ruleIds: ['r01'],        correct: 1 },
  { id: 'q2', categoryId: 'convivencia', ruleIds: ['r09', 'r02', 'r04'], correct: 0 },
  { id: 'q3', categoryId: 'fotos',       ruleIds: ['r08'],        correct: 2 },
  { id: 'q4', categoryId: 'pertences',   ruleIds: ['r10', 'r07'], correct: 1 },
  { id: 'q5', categoryId: 'criancas',    ruleIds: ['r11', 'r14'], correct: 0 }
];
