/*
 * Utilitários de DOM: criação de elementos e ícones.
 * Toda a interface dinâmica é montada com estas funções (sem concatenar HTML de texto),
 * o que evita injeção de HTML e mantém a manipulação do DOM em um só lugar.
 */
(function (MF) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  /**
   * Cria um elemento.
   * @param {string} tag
   * @param {Object} [attrs]  className, text, dataset, e quaisquer atributos; `on*` recebe função.
   * @param {Array|Node|string} [children]
   */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      var value = attrs[key];
      if (value === null || value === undefined || value === false) return;
      if (key === 'className') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key === 'dataset') Object.keys(value).forEach(function (k) { node.dataset[k] = value[k]; });
      else if (key.indexOf('on') === 0 && typeof value === 'function') node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    });
    append(node, children);
    return node;
  }

  function append(node, children) {
    if (children === null || children === undefined) return;
    (Array.isArray(children) ? children : [children]).forEach(function (child) {
      if (child === null || child === undefined || child === false) return;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  /** Ícone decorativo (aria-hidden). `name` é uma chave de assets/icons/icons.js. */
  function icon(name) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    // O conteúdo vem de assets/icons/icons.js (arquivo do próprio projeto, não de entrada do usuário).
    svg.innerHTML = MF.icons[name] || '';
    return svg;
  }

  /** Preenche os elementos estáticos do HTML marcados com data-icon="nome". */
  function hydrateIcons(root) {
    root.querySelectorAll('[data-icon]').forEach(function (slot) {
      clear(slot).appendChild(icon(slot.getAttribute('data-icon')));
    });
  }

  MF.dom = { el: el, append: append, clear: clear, icon: icon, hydrateIcons: hydrateIcons };
})(window.MF);
