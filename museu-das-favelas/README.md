# Regras do Museu das Favelas: aplicação web interativa

Aplicação estática (HTML5, CSS3 e JavaScript puro) que apresenta as regras de convivência do
Museu das Favelas como um percurso interativo: 5 etapas, quiz de fixação e resultado.
Pensada para o visitante abrir pelo celular, via QR Code. Sem backend, sem cadastro, sem dependências.

Fonte das regras: <https://www.museudasfavelas.org.br/visite/> ("O que você precisa saber antes de visitar o Museu").

## Como executar localmente

**Opção 1 (mais simples):** dê dois cliques em `index.html`. Funciona direto do disco, sem instalar nada.

**Opção 2 (servidor local opcional):** na pasta do projeto, rode `python3 -m http.server 8080`
e abra <http://localhost:8080>. Útil para testar no celular pela rede local.

Os scripts são clássicos (sem módulos ES) justamente para a Opção 1 funcionar.

## Como publicar (e usar com QR Code)

1. Envie **a pasta inteira** para qualquer hospedagem estática com HTTPS (o `tools/` é opcional).
2. Gere o QR Code a partir da URL final (o app usa caminhos relativos, então funciona na raiz ou em subpasta).
   **A URL do QR impresso não deve mudar depois**: defina o endereço definitivo antes de imprimir.
3. Dá para criar QR Codes que abrem direto em uma etapa ou idioma, porque a posição fica na URL:

| Endereço (após a URL do site) | Abre |
|---|---|
| `#/pt-BR/inicio` | Tela inicial em português |
| `#/pt-BR/regras/3` | Etapa 3 |
| `#/en/inicio`, `#/es/inicio` | Início em inglês / espanhol |
| `#/pt-BR/quiz` | Apresentação do quiz |

Sem nada depois da URL, o idioma é escolhido pelo navegador do visitante (PT, EN ou ES; padrão PT-BR).

## Estrutura

```
index.html               Estrutura semântica, cabeçalho, rodapé, ordem dos scripts
css/
  tokens.css             ★ TODAS as definições visuais (cores, fontes, espaçamentos, alto contraste)
  base.css               Reset, tipografia, foco, utilitários, movimento reduzido
  components.css         Layout e componentes (botões, cartão, quiz, progresso, resultado)
content/
  config.js              Idiomas, link oficial, avisos de "pendente", passos de fonte
  rules.js               ★ Regras (ids, tipo) e categorias (ordem, ícone, regras de cada uma)
  quiz.js                ★ Perguntas (resposta correta por índice, regras relacionadas)
  images.js              ★ Espaços de imagem (caminho, proporção, rótulo, texto alternativo)
  i18n/pt-BR.js en.js es.js   ★ Todos os textos, por chave
js/
  dom.js                 Criação de elementos e ícones
  i18n.js                Troca de idioma e tradução por chave
  state.js               Estado da sessão (em memória): "Entendi" e respostas do quiz
  router.js              Rotas por hash (#/idioma/tela/n), botão Voltar do navegador
  a11y.js                Foco, avisos a leitores de tela, tamanho de fonte e alto contraste
  components/            image-slot.js, progress.js, header.js
  views/                 intro.js, cards.js, quiz.js, result.js
  main.js                Liga tudo
assets/
  icons/icons.js         Ícones (SVG)
  images/                Logotipo e fotos institucionais (ver assets/images/README.md)
  fonts/                 Fonte própria do Museu, se houver (ver abaixo)
tools/check-content.js   Verificação opcional de conteúdo (Node); não faz parte do site
```

## Como atualizar o conteúdo (sem mexer em `js/`)

- **Texto de uma regra:** edite `rule.rNN` nos três arquivos de `content/i18n/`.
- **Nova regra:** só se constar no regulamento oficial. Adicione em `rules.js`, inclua o id na categoria
  certa e crie `rule.rNN` nos três idiomas.
- **Categorias:** título e descrição em `cat.<id>.title` / `cat.<id>.desc`; ordem e regras em `rules.js`.
  Cada categoria precisa de um espaço de imagem com o mesmo id em `images.js`.
- **Quiz:** `quiz.js` (índice da resposta correta) + textos `quiz.qN.*`. Use só informações que o percurso apresenta.
- **Confira tudo** com `node tools/check-content.js`: garante os 3 idiomas com as mesmas chaves e marcadores.

## Como substituir os materiais provisórios

| Item | Onde | Como |
|---|---|---|
| **Cores** | `css/tokens.css` | Altere o bloco "Cores" (e o de alto contraste, se quiser). Confira o contraste: 4,5:1 para texto, 3:1 para bordas e foco. |
| **Tipografia** | `css/tokens.css` | Coloque o arquivo `.woff2` em `assets/fonts/`, descomente o `@font-face` de exemplo e ajuste `--font-body` / `--font-display`. Só use fonte com licença para web. |
| **Logotipo** | `content/images.js` → `logo` | Copie o SVG oficial para `assets/images/` e preencha `src` (e `srcHighContrast` para a versão em fundo escuro). Enquanto vazio, aparece só o nome do Museu em texto. |
| **Fotografias** | `content/images.js` | Preencha `src` de `intro` e de cada categoria. Revise o texto alternativo `img.<nome>.alt` nos três idiomas para descrever a imagem escolhida. |
| **Ícones** | `assets/icons/icons.js` | Cada ícone é o miolo de um SVG 24×24 (traço, `currentColor`). Troque o desenho mantendo a chave. |
| **Avisos "pendente"** | `content/config.js` | `showReviewNotice: false` remove o aviso do rodapé; `showPlaceholderLabels: false` remove os rótulos dos espaços de imagem. |

Se um arquivo de imagem informado não existir, o espaço reservado volta a aparecer (nunca há imagem quebrada).

## O que foi implementado

Tela inicial · seleção de idioma (PT-BR, EN, ES, com toda a interface e o conteúdo) · 5 categorias em cartões ·
indicador de progresso · "Entendi" para liberar "Próximo" · "Voltar" · quiz de 5 perguntas com feedback imediato,
explicação e resultado · refazer o quiz · rever o tema em que errou · controles de fonte (A−, A, A+) e alto contraste ·
layout responsivo (mobile-first) · link discreto para a página oficial de visitação no rodapé.

Decisões de fidelidade ao regulamento: as 14 frases oficiais são exibidas literalmente (em português); "evite o uso do
flash" continua sendo uma orientação, não uma proibição; a mensagem de encerramento do Museu aparece no resultado e
**não** é tratada como regra; nenhuma regra, exceção ou justificativa foi acrescentada; nada sobre regras de exposições
específicas foi inventado (a regra "Respeite as regras de cada exposição e espaço" é exibida como está).

## Acessibilidade (WCAG 2.1 AA)

Estrutura semântica e um `h1` por tela · foco movido para o título a cada etapa · foco sempre visível · tudo operável
por teclado · link "Pular para o conteúdo" · feedback do quiz com ícone + texto (nunca só cor) · botões bloqueados
usam `aria-disabled` (continuam focáveis e explicam o motivo) · avisos em região `aria-live` (idioma, fonte, contraste,
"Entendi") · `lang` atualizado na troca de idioma · barra de progresso com `role="progressbar"` e texto · sem limite
de tempo, sem conteúdo piscante, movimento reduzido respeitado · zoom do navegador e controle de fonte sem rolagem
horizontal a 320 px · alto contraste, que também segue a preferência do sistema (`prefers-contrast`).
As preferências (fonte, contraste) e as respostas do quiz ficam **só em memória**: nada é gravado no aparelho.

**O que foi testado:** percurso completo, idiomas, fonte, contraste, teclado, reflow e erros de console, automatizados
em Chromium; contraste de cores calculado para a paleta normal e de alto contraste. **O que ainda não foi testado:**
Safari/iOS, Firefox, Edge, aparelhos reais e leitores de tela (VoiceOver, TalkBack, NVDA). Recomenda-se esse teste manual
antes de publicar.

## Pendências (resumo)

Aprovação do Museu para: textos de EN e ES, descrições das etapas, perguntas e alternativas do quiz.
Materiais: logotipo oficial (SVG, positivo e negativo), manual de identidade (cores, fontes e licença web),
imagens institucionais com autorização de uso, favicon, URL pública definitiva, regras específicas por exposição/espaço
(se o Museu quiser incluí-las), definição de "bolsas e mochilas grandes" e local do guarda-volumes (hoje o texto oficial
não define). Detalhes na lista entregue junto com este projeto.
