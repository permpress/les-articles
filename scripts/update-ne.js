#!/usr/bin/env node

// loop through .html files in the articles directory

const { execSync } = require('child_process')
const fs = require('fs')
let db = JSON.parse(fs.readFileSync('./db.json', 'utf8'))
const getMetadata = require('../out/helpers').getMetadata
let urls = []
Promise.all(
    db.articles.map(async (article) => {
        article['metadata'] = await getMetadata(article.path, article.originalUrl)
        return article
        // execSync(`python3 nex.py ${file.path}`, { stdio: 'inherit' })
        // execSync(`./out/update-db.js ${file.originalUrl}`, { stdio: 'inherit' })
    }),
).then((articlesWithMeta) => {
    db.articles = articlesWithMeta
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2))
})

// Write to file
// fs.writeFileSync('./db.archive.json', JSON.stringify(urls, null, 2))
