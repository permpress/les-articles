#!/usr/bin/env node

// loop through .html files in the articles directory

const { execSync } = require('child_process')
const fs = require('fs')
let db = JSON.parse(fs.readFileSync('./db.json', 'utf8'))

let urls = []
db.articles.map((file) => {
    urls.push(file.originalUrl)
    // execSync(`python3 nex.py ${file.path}`, { stdio: 'inherit' })
    // execSync(`./out/update-db.js ${file.originalUrl}`, { stdio: 'inherit' })
})

// Write to file
fs.writeFileSync('./db.archive.json', JSON.stringify(urls, null, 2))
