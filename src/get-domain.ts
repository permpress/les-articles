#!/usr/bin/env node

export function getDomainFromUrl(url: string) {
    const domain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    return domain.split('/')[0]
}

const url = process.argv[2]
if (url) {
    console.log(getDomainFromUrl(url))
}
