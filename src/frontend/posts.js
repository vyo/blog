'use strict'

const m = require('mithril')
const mark = require('markdown-it')({html: true})
const mdPrismPlugin = require('./prism-plugin').plugin
mark.use(mdPrismPlugin)
const Moment = require('moment')
// const MomentDE = require('moment/locale/de')

const PostList = {
  data: [],
  load: async () => {
    const content = await m.request({
      method: 'GET',
      url: '/contentindex.json'
    })
    PostList.data = content.posts
  }
}

const PostListView = () => ({
  oninit: PostList.load,
  view: () => m('div', PostList.data.map(postInfo =>
    m('div', {class: 'vyo-spacing'}, [
      m('div', Moment(postInfo.date).format('dddd, MMMM Do YYYY')),
      m('h2', m.trust(mark.render(postInfo.title))),
      m(`a[href=/posts/${postInfo.content.substring(0, postInfo.content.lastIndexOf('.md'))}]`, {oncreate: m.route.link}, `${postInfo.intro || ''}\n{...}`)
    ]))
  )
})

const Post = {
  data: {},
  load: async (name) => {
    const postMeta = await m.request({
      method: 'GET',
      url: `/posts/${name}.json`
    })
    const postContent = await m.request({
      method: 'GET',
      url: `/posts/${postMeta.content}`,
      deserialize: (value) => mark.render(value)
    })
    Post.data = postMeta
    Post.data.md = postContent
  }
}

const PostView = (name) => ({
  oninit: (vnode) => Post.load(vnode.attrs.name),
  view: () => {
    return m('div', [
      m('h2', m.trust(mark.render(Post.data.title || '[untitled]'))),
      m.trust(Post.data.md)
    ])
  }
})

module.exports = {
  post: PostView,
  posts: PostListView
}
