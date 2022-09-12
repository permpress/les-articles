#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import { generateSlug, getDomainFromUrl } from './helpers'

const url = process.argv[2]

if (!url) {
    console.error(`${chalk.red('✗')} Please provide a URL.`)
    process.exit(1)
}

// Check if folder exists
if (!fs.existsSync(`./articles/${getDomainFromUrl(url)}`)) {
    fs.mkdirSync(`./articles/${getDomainFromUrl(url)}`)
}

console.log(generateSlug(url))
