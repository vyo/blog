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
  const Bundle = Fs.createWriteStream('./public/js/bundle.js')
  Bfy.bundle().pipe(Bundle)
})

// build content index
const ContentIndex = {
  posts: Glob.sync('./public/posts/**/*.json')
    .map(file => require(file))
    .map(info => Object.assign({}, info, {
      intro: Fs.readFileSync('./public/posts/' + info.content, 'utf8').substring(0, Fs.readFileSync('./public/posts/' + info.content, 'utf8').indexOf('\n\n'))
    })).sort((a, b) => a.date.localeCompare(b.date)).reverse() || [],
  talks: Glob.sync('./public/talks/**/*.json').map(file => file.substring(9)).sort((a, b) => a.date.localeCompare(b.date)).reverse() || []
}

const CIStream = Fs.createWriteStream('./public/contentindex.json')

CIStream.write(JSON.stringify(ContentIndex))
CIStream.end()
