#!/usr/bin/env node

// loop through .html files in the articles directory

const { execSync } = require('child_process')
const fs = require('fs')
let db = JSON.parse(fs.readFileSync('./db.json', 'utf8'))

db.articles.map((file) => {
    execSync(`python3 nex.py ${file.path}`, { stdio: 'inherit' })
    execSync(`./out/update-db.js ${file.originalUrl}`, { stdio: 'inherit' })
})
