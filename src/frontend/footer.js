'use strict'

const m = require('mithril')

const Footer = {
  view: () => m('div', {class: 'container vyo-centered'},
    m('div', {class: 'row'},
      m('div', {class: 'column column-50 column-offset-25'},
        m('p', [
          'Crafted with ',
          m('i', {class: 'fas fa-heart vyo-secondary'}),
          ', powered by Mithril & Milligram.'
        ])
      )
    )
  )
}

module.exports = Footer
