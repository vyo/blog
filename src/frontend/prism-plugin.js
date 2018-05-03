'use strict'

const highlight = (markdownit, text, lang) => {
  const prism = window.Prism
  const prismLang = prism.languages[lang]
  const code = prismLang ? prism.highlight(text, prismLang) : markdownit.utils.escapeHtml(text)
  const classAttribute = lang ? ` class="${markdownit.options.langPrefix}${lang}"` : ''
  return `<pre${classAttribute}><code${classAttribute}>${code}</code></pre>`
}

module.exports = {
  plugin: (markdownit, useroptions) => {
    const options = Object.assign({}, {plugins: [], init: () => {}}, useroptions)

    options.init(window.Prism)

    markdownit.options.highlight = (...args) => highlight(markdownit, ...args)
  }
}
