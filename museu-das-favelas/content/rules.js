/*
 * Regras e categorias (estrutura neutra de idioma).
 *
 * Os TEXTOS ficam em content/i18n/*.js, nas chaves:
 *   rule.<id>            texto da regra
 *   cat.<id>.title       título da categoria
 *   cat.<id>.desc        descrição da categoria
 *
 * Fonte: https://www.museudasfavelas.org.br/visite/ ("O que você precisa saber antes de visitar o Museu").
 * Nenhuma regra além das listadas no regulamento oficial deve ser adicionada aqui.
 *
 * Campos de cada regra:
 *   id       identificador estável (usado no quiz e na rastreabilidade)
 *   type     'permission' (o que se pode fazer) | 'rule' (orientação ou regra de convivência)
 *   section  seção do regulamento oficial onde a frase aparece (rastreabilidade)
 */
MF.rules = {
  r01: { id: 'r01', type: 'permission', section: 'pode' },
  r02: { id: 'r02', type: 'permission', section: 'pode' },
  r03: { id: 'r03', type: 'permission', section: 'pode' },
  r04: { id: 'r04', type: 'permission', section: 'pode' },
  r05: { id: 'r05', type: 'permission', section: 'pode' },
  r06: { id: 'r06', type: 'rule', section: 'convivencia' },
  r07: { id: 'r07', type: 'rule', section: 'convivencia' },
  r08: { id: 'r08', type: 'rule', section: 'convivencia' },
  r09: { id: 'r09', type: 'rule', section: 'convivencia' },
  r10: { id: 'r10', type: 'rule', section: 'conforto' },
  r11: { id: 'r11', type: 'rule', section: 'conforto' },
  r12: { id: 'r12', type: 'rule', section: 'conforto' },
  r13: { id: 'r13', type: 'rule', section: 'conforto' },
  r14: { id: 'r14', type: 'rule', section: 'conforto' }
};

/* Categorias, na ordem do percurso (aprovada na Fase 1). `icon` é uma chave de assets/icons/icons.js. */
MF.categories = [
  { id: 'pode',        icon: 'smile',  ruleIds: ['r01', 'r02', 'r03', 'r04', 'r05'] },
  { id: 'convivencia', icon: 'users',  ruleIds: ['r06', 'r09', 'r12', 'r13'] },
  { id: 'fotos',       icon: 'camera', ruleIds: ['r08'] },
  { id: 'pertences',   icon: 'bag',    ruleIds: ['r07', 'r10'] },
  { id: 'criancas',    icon: 'heart',  ruleIds: ['r11', 'r14'] }
];
