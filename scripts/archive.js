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

fs.writeFileSync(
    './public/assets/db.min.json',
    JSON.stringify(
        {
            ...db,
            articles: db.articles.map((article) => {
                let image = article.metaData?.image
                // if image is base64 encoded, remove it
                if (image && image.startsWith('data:image')) {
                    article.metaData.image = ''
                }
                return { ...article, namedEntities: undefined }
            }),
        },
        null,
        4,
    ),
)
