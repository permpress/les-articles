#!/usr/bin/env node

import { getPath } from './helpers'

const url = process.argv[2]

if (url) {
    console.log(getPath(url))
}
