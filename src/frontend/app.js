'use strict'

const m = require('mithril')

const rootAnchour = document.getElementById('content')
const headerAnchour = document.getElementById('header')
const footerAnchour = document.getElementById('footer')

m.mount(headerAnchour, require('./header'))

m.mount(footerAnchour, require('./footer'))

m.route(rootAnchour, '/posts', {
  '/posts': require('./posts').posts,
  '/posts/:name...': require('./posts').post,
  '/error/internal': require('./error').internal,
  '/error/notfound': require('./error').notFound,
  '/:error...': require('./error').notFound
})
