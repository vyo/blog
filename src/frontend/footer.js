'use strict'

const m = require('mithril')

const Footer = {
  view: () => m('div', {class: 'container vyo-centered'},
    m('div', {class: 'row'},
      m('div', {class: 'column column-50 column-offset-25'},
        [
          m('p', [
            'Crafted with ',
            m('i', {class: 'fas fa-heart vyo-secondary'}),
            ', powered by ',
            m('a', {href: 'https://mithril.js.org'}, 'Mithril'),
            ' & ',
            m('a', {href: 'https://milligram.io'}, 'Milligram'),
            '. Logo by ',
            m('a', {href: 'https://twitter.com/caitelle1'}, 'cait'),
            '.'
          ]),
          m('p', [
            m(m.route.Link, {href: '/legal'}, 'Legal notice')
          ])
        ]
      )
    )
  )
}

module.exports = Footer
