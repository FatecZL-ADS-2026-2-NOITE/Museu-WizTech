# Imagens institucionais

Esta pasta guarda o logotipo e as fotografias. **Nenhuma imagem foi incluída de propósito**: a aplicação usa
espaços reservados identificados até o Museu fornecer material próprio, com autorização de uso (e de imagem das
pessoas retratadas, conforme a LGPD). Não use fotos de bancos de imagem, de terceiros ou geradas artificialmente.

## Como adicionar uma imagem

1. Copie o arquivo para esta pasta, com o nome sugerido abaixo.
2. Em `content/images.js`, troque `src: null` pelo caminho, por exemplo `src: 'assets/images/intro.jpg'`.
3. Revise o **texto alternativo** (`img.<nome>.alt`) nos três arquivos de `content/i18n/`: ele deve descrever
   exatamente a imagem escolhida e ser escrito/revisado com o Museu, nos três idiomas.
4. Quando todas as imagens estiverem no lugar, defina `showPlaceholderLabels: false` em `content/config.js`.

## Lista de imagens previstas

| Nome sugerido | Onde aparece | Proporção reservada | Observação |
|---|---|---|---|
| `logo.svg` | Cabeçalho | 4 : 1 | Logotipo oficial, versão para fundo claro. Não recriar nem redesenhar. |
| `logo-negativo.svg` | Cabeçalho (alto contraste) | 4 : 1 | Versão para fundo escuro (opcional; preencha `srcHighContrast`). |
| `intro.jpg` | Tela inicial | 4 : 3 | Imagem institucional de boas-vindas. |
| `categoria-pode.jpg` | Etapa 1 · Aqui você pode | 16 : 9 | Convivência e acolhimento. |
| `categoria-convivencia.jpg` | Etapa 2 · Convivência e respeito | 16 : 9 | |
| `categoria-fotos.jpg` | Etapa 3 · Fotos e preservação | 16 : 9 | |
| `categoria-pertences.jpg` | Etapa 4 · Seus pertences | 16 : 9 | |
| `categoria-criancas.jpg` | Etapa 5 · Crianças e animais | 16 : 9 | |

## Recomendações técnicas

- Fotos em JPG ou WebP, até cerca de 150 KB cada (largura de 1000 px basta), para carregar rápido em 4G.
- Logotipo em SVG. A imagem é recortada (`object-fit: cover`) para preencher a proporção reservada;
  mantenha o assunto principal no centro.
- Cada categoria usa o espaço de imagem com o **mesmo id** da categoria em `content/images.js`.
