/*
 * Verificação de conteúdo (ferramenta de desenvolvimento; NÃO faz parte do site).
 * Uso: node tools/check-content.js
 *
 * Confere:
 *  - os três dicionários têm exatamente as mesmas chaves e os mesmos {marcadores};
 *  - toda regra, categoria, pergunta e imagem tem seus textos em todos os idiomas;
 *  - toda regra pertence a exatamente uma categoria;
 *  - cada pergunta aponta para uma alternativa correta válida e para regras existentes.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
// No navegador, `window.MF = ...` cria a global MF. Aqui, `window` é o próprio contexto.
const sandbox = { console };
sandbox.window = sandbox;
vm.createContext(sandbox);

const files = [
  'content/config.js', 'assets/icons/icons.js', 'content/images.js', 'content/rules.js',
  'content/quiz.js', 'content/i18n/pt-BR.js', 'content/i18n/en.js', 'content/i18n/es.js'
];
for (const f of files) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
}
const MF = sandbox.MF;

const errors = [];
const fail = (msg) => errors.push(msg);
const placeholders = (s) => (s.match(/\{\w+\}/g) || []).sort().join(',');

const langs = MF.config.languages.map((l) => l.code);
const base = MF.dictionaries[langs[0]];

// 1. Paridade de chaves e marcadores
for (const code of langs) {
  const dict = MF.dictionaries[code];
  if (!dict) { fail(`Dicionário ausente: ${code}`); continue; }
  for (const key of Object.keys(base)) {
    if (!(key in dict)) fail(`[${code}] chave ausente: ${key}`);
    else {
      if (!String(dict[key]).trim()) fail(`[${code}] texto vazio: ${key}`);
      if (placeholders(String(dict[key])) !== placeholders(String(base[key]))) {
        fail(`[${code}] marcadores diferentes em ${key}`);
      }
    }
  }
  for (const key of Object.keys(dict)) {
    if (!(key in base)) fail(`[${code}] chave extra (não existe em ${langs[0]}): ${key}`);
  }
}

// 2. Cobertura de conteúdo
const need = (key) => { if (!(key in base)) fail(`Chave necessária ausente: ${key}`); };
Object.keys(MF.rules).forEach((id) => need(`rule.${id}`));
MF.categories.forEach((c) => { need(`cat.${c.id}.title`); need(`cat.${c.id}.desc`); });
MF.quiz.forEach((q) => {
  need(`quiz.${q.id}.prompt`); need(`quiz.${q.id}.explain`);
  [1, 2, 3].forEach((n) => need(`quiz.${q.id}.o${n}`));
});
Object.values(MF.images).forEach((img) => { need(img.labelKey); need(img.altKey); });

// 3. Regras x categorias
const seen = {};
MF.categories.forEach((c) => {
  if (!MF.icons[c.icon]) fail(`Categoria ${c.id}: ícone inexistente "${c.icon}"`);
  if (!MF.images[c.id]) fail(`Categoria ${c.id}: sem espaço de imagem em content/images.js`);
  c.ruleIds.forEach((rid) => {
    if (!MF.rules[rid]) fail(`Categoria ${c.id}: regra inexistente ${rid}`);
    seen[rid] = (seen[rid] || 0) + 1;
  });
});
Object.keys(MF.rules).forEach((rid) => {
  if (seen[rid] !== 1) fail(`Regra ${rid} aparece ${seen[rid] || 0} vez(es) nas categorias (esperado: 1)`);
});

// 4. Quiz
const catIds = MF.categories.map((c) => c.id);
MF.quiz.forEach((q) => {
  if (![0, 1, 2].includes(q.correct)) fail(`Pergunta ${q.id}: índice correto inválido`);
  if (!catIds.includes(q.categoryId)) fail(`Pergunta ${q.id}: categoria inexistente`);
  q.ruleIds.forEach((rid) => { if (!MF.rules[rid]) fail(`Pergunta ${q.id}: regra inexistente ${rid}`); });
});

// 5. Ícones usados
['check', 'x', 'info', 'arrowLeft', 'arrowRight', 'refresh', 'external', 'contrast', 'imagePlaceholder']
  .forEach((k) => { if (!MF.icons[k]) fail(`Ícone de interface ausente: ${k}`); });

if (errors.length) {
  console.error(`FALHOU (${errors.length}):\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log(`OK: ${langs.length} idiomas, ${Object.keys(base).length} chaves cada, ` +
  `${Object.keys(MF.rules).length} regras, ${MF.categories.length} categorias, ${MF.quiz.length} perguntas.`);
