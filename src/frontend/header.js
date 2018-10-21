'use strict'

const m = require('mithril')

const Header = {
  view: () => [
    m('div', {class: 'row'},
      m('div', {
        class: 'column column-50 column-offset-25'
      }, m('div', {
        class: 'avatar-container vyo-centered'
      }, [
        m('a', {href: '/'},
          m('img', {
            id: 'vyo-avatar',
            src: 'img/vyolin_avatar.png',
            alt: 'weidmann.design'
          })),
        m('div', {class: 'row vyo-top-align'},
          m('div', {class: 'column column-50 column-offset-25'}, 'Vim, vinyl, vino.')
        ),
        m('div', {class: 'row vyo-top-align'},
          m('div', {class: 'column column-50 column-offset-25'},
            [
              m('a', {class: 'symbol', target: '_blank', href: 'https://twitter.com/0x76796f'},
                m('i', {class: 'fab fa-twitter'})
              ),
              m('a', {class: 'symbol', target: '_blank', href: 'https://github.com/vyo'},
                m('i', {class: 'fab fa-github'})
              ),
              m('a', {class: 'symbol', target: '_blank', href: 'https://gitlab.com/vyo'},
                m('i', {class: 'fab fa-gitlab'})
              ),
              m('a', {class: 'symbol', target: '_blank', href: 'https://bandcamp.com/weidmann'},
                m('i', {class: 'fab fa-bandcamp'})
              ),
              m('a', {class: 'symbol', target: '_blank', href: 'mailto:manuel.weidmann@gmail.com'},
                m('i', {class: 'fas fa-envelope-open'})
              )
            ])
        )
      ])
      )
    )
  ]
}

module.exports = Header
