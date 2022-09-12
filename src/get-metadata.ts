#!/usr/bin/env node

import { getPath, getMetadata } from './helpers'

const url = process.argv[2]
const pathToHTML = getPath(url)

if (url) {
    console.log(getPath(url))
    getMetadata(pathToHTML, url)
}
