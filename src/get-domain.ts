#!/usr/bin/env node

import { getDomainFromUrl } from './helpers'

const url = process.argv[2]
if (url) {
    console.log(getDomainFromUrl(url))
}
