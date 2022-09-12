import fs from 'fs'
export class Database {
    articles: Article[] = []
    lastUpdatedAt!: string
    articleCount!: number
    '$schema' = './src/db.schema.json'

    constructor(path: string) {
        const db = JSON.parse(fs.readFileSync(path, 'utf8'))
        this.articles = db.articles
        this.lastUpdatedAt = db.lastUpdatedAt
        this.articleCount = db.articleCount
    }

    appendArticle(article: Article) {
        this.articles.push(article)
        this.articleCount = this.articles.length
        this.lastUpdatedAt = new Date().toISOString()
        this.write()
    }

    write() {
        const db = {
            articles: this.articles,
            lastUpdatedAt: this.lastUpdatedAt,
            articleCount: this.articleCount,
            $schema: this.$schema,
        }
        fs.writeFileSync('./db.json', JSON.stringify(db, null, 4))
    }
}

interface Article {
    domain: string
    originalUrl: string
    slug: string
    tags: string[]
    createdAt: string
    updatedAt: string
    path: string
}
