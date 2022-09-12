#!/usr/bin/env node
import slug from 'slug'
import chalk from 'chalk'
import fs from 'fs'
import { getDomainFromUrl } from './get-domain'

const url = process.argv[2]

if (!url) {
    console.error(`${chalk.red('✗')} Please provide a URL.`)
    process.exit(1)
}

// Remove http/https/www
export function generateSlug(url: string) {
    return slug(
        url
            .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
            .split('/')
            .slice(1)
            .join('-'),
    )
}

// Check if folder exists
if (!fs.existsSync(`./articles/${getDomainFromUrl(url)}`)) {
    fs.mkdirSync(`./articles/${getDomainFromUrl(url)}`)
}

console.log(generateSlug(url))
