'use strict'

const m = require('mithril')

const Footer = {
  view: () => m('div', {class: 'container vyo-centered'},
    m('div', {class: 'row'},
      m('div', {class: 'column column-50 column-offset-25'},
        [
          m('div', [
            m('h2', {class: 'vyo-left'}, 'Data Collection'),
            m('p', {class: 'vyo-left'}, 'No traceable data such as IP addresses is being collected.')
          ]),
          m('div', [
            m('h2', {class: 'vyo-left'}, 'Data Usage'),
            m('p', {class: 'vyo-left'}, 'No cookies or other forms of personalised, persistent content is being utilised for this site.')
          ])
        ]
      )
    )
  )
}

module.exports = Footer
