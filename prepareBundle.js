'use strict'

const Bfy = require('browserify')()
const Glob = require('glob')
const Fs = require('fs')
const Path = require('path')

// bundle all frontend JS files
Fs.readdir('./src/frontend', (err, files) => {
  if (err) {
    throw err
  }
  files.forEach(file => {
    Bfy.add(Path.join('./src/frontend', Path.relative(process.cwd(), file)))
  })
  const Bundle = Fs.createWriteStream('./static/js/bundle.js')
  Bfy.bundle().pipe(Bundle)
})

// build content index
const ContentIndex = {
  posts: Glob.sync('./static/posts/**/*.json')
    .map(file => require(file))
    .map(info => Object.assign({}, info, {
      intro: Fs.readFileSync('./static/posts/' + info.content, 'utf8').substring(0, Fs.readFileSync('./static/posts/' + info.content, 'utf8').indexOf('\n\n'))
    })) || [],
  talks: Glob.sync('./static/talks/**/*.json').map(file => file.substring(9)) || []
}

const CIStream = Fs.createWriteStream('./static/contentindex.json')

CIStream.write(JSON.stringify(ContentIndex))
CIStream.end()
