'use strict'

const m = require('mithril')

const Header = {
  view: () => [
    m('div', {class: 'row'},
      m('div', {
        class: 'column'
      }, m('div', {
        class: 'avatar-container vyo-centered vyo-snap-element'
      }, [
        m(m.route.Link, {href: '/'},
          m('img', {
            id: 'vyo-avatar',
            src: 'img/Logo.png',
            alt: 'blog.vyo.sh'
          })),
        m('div', {class: 'row vyo-top-align'},
          m('div', {class: 'column'}, 'Vim, vinyl, vino.')
        ),
        m('div', {class: 'row vyo-top-align'},
          m('div', {class: 'column'},
            [
              m('a', {class: 'symbol', target: '_blank', href: 'https://twitter.com/0x76796f'},
                m('i', {class: 'fab fa-twitter'})
              ),
              m('a', {class: 'symbol', target: '_blank', href: 'https://twitter.com/vyocodes'},
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
