import slug from 'slug'

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

export function getDomainFromUrl(url: string) {
    const domain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    return domain.split('/')[0]
}

export function getPath(url: string) {
    const domain = getDomainFromUrl(url)
    const slug = generateSlug(url)
    return `articles/${domain}/${slug}.html`
}
