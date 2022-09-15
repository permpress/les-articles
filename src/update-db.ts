#!/usr/bin/env node
import path from 'path'
import chalk from 'chalk'
import { Database } from './db.model'
import { generateSlug, getDomainFromUrl, getMetadata, getPath, removeDuplicateEntities } from './helpers'
import fs from 'fs'
const originalUrl = process.argv[2]
const tags: string[] = Array.isArray(process.argv[3]) ? process.argv[3] : []

if (!originalUrl) {
    console.error(`${chalk.red('✗')} Please provide a URL.`)
    process.exit(1)
}

const slug = generateSlug(originalUrl)
const dbPath = path.join(__dirname, '../db.json')
const domain = getDomainFromUrl(originalUrl)

let getNamedEntities = () => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../tmp/named-entities.json'), 'utf8'))
    } catch (err) {
        console.error(`${chalk.red('✗')} Could not read named-entities.json.`)
        return {}
    }
}

let namedEntities = removeDuplicateEntities(getNamedEntities())
console.log(`${chalk.green('✓')} Named entities: ${JSON.stringify(namedEntities)}`)

getMetadata(getPath(originalUrl), originalUrl).then((metadata) => {
    new Database(dbPath).appendArticle({
        createdAt: new Date().toISOString(),
        domain,
        originalUrl,
        slug,
        tags,
        updatedAt: new Date().toISOString(),
        path: `articles/${domain}/${slug}.html`,
        namedEntities,
        metadata,
    })
    console.log(`${chalk.green('✓')} Added ${chalk.cyan(originalUrl)} to the database.`)
})
