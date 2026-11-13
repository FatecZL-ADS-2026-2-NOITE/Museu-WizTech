/*
 * Internacionalização.
 *  - t(chave, params): texto no idioma atual, com {marcadores}; cai para pt-BR se faltar.
 *  - setLang(code): troca o idioma, atualiza <html lang>, <title>, meta description e os
 *    elementos estáticos marcados com data-i18n / data-i18n-attr.
 *  - detect(): idioma do navegador (pt, en, es) ou o padrão.
 * O estado da aplicação nunca guarda textos traduzidos, só chaves e índices.
 */
(function (MF) {
  'use strict';

  var current = MF.config.defaultLang;

  function codes() {
    return MF.config.languages.map(function (l) { return l.code; });
  }

  function isSupported(code) {
    return codes().indexOf(code) !== -1;
  }

  function lookup(lang, key) {
    var dict = MF.dictionaries[lang];
    return dict && Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : undefined;
  }

  function t(key, params) {
    var text = lookup(current, key);
    if (text === undefined) text = lookup(MF.config.defaultLang, key);
    if (text === undefined) {
      if (window.console) console.warn('[i18n] chave ausente:', key);
      return key;
    }
    return text.replace(/\{(\w+)\}/g, function (match, name) {
      return params && name in params ? String(params[name]) : match;
    });
  }

  /** Atualiza elementos estáticos do HTML: data-i18n="chave" e data-i18n-attr="atributo:chave;...". */
  function applyStatic(root) {
    root.querySelectorAll('[data-i18n]').forEach(function (node) {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (node) {
      node.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }

  function setLang(code) {
    current = isSupported(code) ? code : MF.config.defaultLang;
    document.documentElement.lang = current;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('app.description'));
    applyStatic(document);
    return current;
  }

  /** Aceita "pt", "pt-BR", "en-US", "es-MX"... e devolve um código suportado ou null. */
  function match(tag) {
    if (!tag) return null;
    var lower = String(tag).toLowerCase();
    var found = codes().filter(function (code) {
      return code.toLowerCase() === lower || code.toLowerCase().split('-')[0] === lower.split('-')[0];
    });
    return found[0] || null;
  }

  function detect() {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (var i = 0; i < list.length; i++) {
      var found = match(list[i]);
      if (found) return found;
    }
    return MF.config.defaultLang;
  }

  function languageName(code) {
    var found = MF.config.languages.filter(function (l) { return l.code === code; })[0];
    return found ? found.name : code;
  }

  MF.i18n = {
    t: t,
    setLang: setLang,
    getLang: function () { return current; },
    isSupported: isSupported,
    match: match,
    detect: detect,
    languageName: languageName,
    applyStatic: applyStatic
  };
})(window.MF);
