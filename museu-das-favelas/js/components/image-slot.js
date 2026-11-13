/*
 * Espaço para imagem institucional.
 * Se content/images.js tiver `src`, mostra a imagem (com texto alternativo do dicionário).
 * Se `src` for null, ou se o arquivo não existir, mostra um espaço reservado identificado.
 * Nunca deixa imagem quebrada.
 */
(function (MF) {
  'use strict';

  MF.components = MF.components || {};
  var el = MF.dom.el;

  function placeholder(config, variant) {
    var label = MF.i18n.t(config.labelKey);
    var node;

    if (variant === 'logo') {
      // Não recriamos o logotipo: enquanto o arquivo oficial não chega, só o nome do Museu em texto.
      node = el('div', { className: 'image-slot image-slot--logo', title: label, text: MF.i18n.t('app.name') });
      return node;
    }

    // Espaço reservado puramente visual: o conteúdo real ainda não existe, então fica oculto aos leitores de tela.
    node = el('div', { className: 'image-slot' + (variant ? ' image-slot--' + variant : ''), 'aria-hidden': 'true' },
      el('div', { className: 'image-slot__inner' }, [
        MF.dom.icon('imagePlaceholder'),
        MF.config.showPlaceholderLabels ? el('span', { className: 'image-slot__label', text: label }) : null
      ]));
    node.style.setProperty('--ratio', config.ratio);
    return node;
  }

  /**
   * @param {string} key      chave em MF.images
   * @param {Object} [opts]   variant: 'card' | 'logo'; highContrast: usa srcHighContrast se existir
   */
  function imageSlot(key, opts) {
    opts = opts || {};
    var config = MF.images[key];
    var src = opts.highContrast && config.srcHighContrast ? config.srcHighContrast : config.src;
    if (!src) return placeholder(config, opts.variant);

    var wrapper = el('div', { className: 'image-slot image-slot--filled' + (opts.variant ? ' image-slot--' + opts.variant : '') });
    wrapper.style.setProperty('--ratio', config.ratio);

    var img = el('img', { className: 'image-slot__img', src: src, alt: MF.i18n.t(config.altKey), loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', function () {
      // Arquivo ausente: volta ao espaço reservado em vez de mostrar imagem quebrada.
      if (wrapper.parentNode) wrapper.parentNode.replaceChild(placeholder(config, opts.variant), wrapper);
    });
    wrapper.appendChild(img);
    return wrapper;
  }

  MF.components.imageSlot = imageSlot;
})(window.MF);
