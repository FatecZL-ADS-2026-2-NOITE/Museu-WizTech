# Fontes

A aplicação usa, por enquanto, as fontes do sistema (nenhum arquivo de fonte é carregado).

Para usar a tipografia oficial do Museu, caso exista e tenha licença para uso na web:

1. Coloque os arquivos `.woff2` nesta pasta.
2. Em `css/tokens.css`, descomente o `@font-face` de exemplo e ajuste o caminho.
3. Atualize `--font-body` e `--font-display` em `css/tokens.css`.

Não use fontes carregadas de serviços externos (Google Fonts, etc.): o projeto deve funcionar sem rede de terceiros.
