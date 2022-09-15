#!/usr/bin/env node
const fs = require('fs')
let db = JSON.parse(fs.readFileSync('./db.json', 'utf8'))

fs.writeFileSync(
    './db.archive.json',
    JSON.stringify(
        db.articles.map(({ originalUrl }) => originalUrl),
        null,
        4,
    ),
)
