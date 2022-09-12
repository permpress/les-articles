import fs from 'fs'
import chalk from 'chalk'
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
        // check if article already exists
        const existingArticle = this.articles.find((a) => a.originalUrl === article.originalUrl)
        if (existingArticle) {
            console.log(
                `${chalk.yellow('⚠')} Article ${chalk.cyan(article.originalUrl)} already exists in the database, Updating...`,
            )
            existingArticle.tags = [...article.tags, ...existingArticle.tags]
            existingArticle.namedEntities = { ...article.namedEntities }
            existingArticle.updatedAt = article.updatedAt
        } else {
            this.articles.push(article)
        }
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

export interface Article {
    domain: string
    originalUrl: string
    slug: string
    tags: string[]
    createdAt: string
    updatedAt: string
    path: string
    namedEntities: NamedEntites
}

export type NamedEntites = { [index: string]: string[] }
