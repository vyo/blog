'use strict'

const m = require('mithril')

const gifs = {
  'voidSmall': {
    image: '/img/smoke-void-darkpink-small.gif',
    filter: 'contrast(100%) invert(0%)',
    height: '350px'
  },
  'plumeSmall': {
    image: '/img/smoke-plume-darkpink-small-noloop.gif',
    filter: 'contrast(100%) invert(0%)',
    height: '350px'
  }
}

const ErrorView = (error) => ({
  view: () => m('div', m('div', [
    m('div', {
      style: {
        'background': `url(${error.gif.image}) center no-repeat`,
        'filter': error.gif.filter,
        'border-radius': '50%',
        'height': error.gif.height
      }
    }, [
      m('h2', error.header),
      m('div', error.description)
    ])
  ]))
})

const NotFound = ErrorView({
  gif: gifs['voidSmall'],
  header: 'There is nothing here.',
  description: 'Whatever you were looking for is gone - or yet to come.'
})

const Internal = ErrorView({
  gif: gifs['plumeSmall'],
  header: 'Oh boy. How embarassing.',
  description: 'Something went south on the server side of things. We\'re sorry'
})

module.exports = {
  notFound: NotFound,
  internal: Internal
}
