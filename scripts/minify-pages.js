#!/usr/bin/env node

// loop through .html files in the articles directory

var minify = require('html-minifier').minify
const fs = require('fs')
let db = JSON.parse(fs.readFileSync('./db.json', 'utf8'))

db.articles.map((article) => {
    let html = fs.readFileSync(article.path, 'utf8')
    let minified = minify(html, {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
    })
    fs.mkdirSync(`./public/pages/${article.path.split('/').slice(0, -1).join('/')}`, { recursive: true })
    fs.writeFileSync(`./public/pages/${article.path}`, minified)
})
