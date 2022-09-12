#!/usr/bin/env node

import chalk from 'chalk'
import { getPath } from './helpers'

const url = process.argv[2]

if (!url) {
    console.error(`${chalk.red('✗')} Please provide a URL.`)
    process.exit(1)
}

console.log(getPath(url))
