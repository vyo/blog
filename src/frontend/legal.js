'use strict'

const m = require('mithril')

const Legal = {
  view: () => m('div', {class: 'vyo-centered'},
    // m('div', {class: 'row'},
    // m('div', {class: 'column column-50 column-offset-25'},
    [
      m('div', {class: 'vyo-spacing'}, [
        m('h2', {class: 'vyo-centered vyo-title vyo-no-link'}, 'Data Collection'),
        m('p', {class: 'vyo-centered'}, 'No traceable data such as IP addresses is being collected.')
      ]),
      m('div', {class: 'vyo-spacing'}, [
        m('h2', {class: 'vyo-centered vyo-title vyo-no-link'}, 'Data Usage'),
        m('p', {class: 'vyo-centered'}, 'No cookies or other forms of personalised, persistent content is being utilised for this site.')
      ])
    ]
    // )
    // )
  )
}

module.exports = Legal
