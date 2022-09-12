require('dotenv').config()
const { Octokit } = require('@octokit/core')

const octokit = new Octokit({
    auth: process.env.PAT,
})

async function sendDownloadRequest(url, tags) {
    return octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
        owner: 'laudebugs',
        repo: 'les-articles',
        workflow_id: 'download-webpage.yml',
        ref: 'main',
        inputs: {
            url,
            tags: JSON.stringify(tags),
        },
    })
}
let jobs = [
    {
        url: 'http://johnsalvatier.org/blog/2017/reality-has-a-surprising-amount-of-detail',
        tags: ['life'],
    },
    {
        url: 'https://psyche.co/ideas/why-some-of-the-smartest-people-can-be-so-very-stupid',
        tags: ['sciencd & nature'],
    },
    {
        url: 'https://blog.tdwright.co.uk/2022/07/14/fizzbuzz-is-fizzbuzz-years-old-and-still-a-powerful-tool/',
        tags: ['interviewing'],
    },
    {
        url: 'https://www.twilio.com/blog/sqlite-postgresql-complicated',
        tags: ['databases'],
    },
]

jobs.map(({ url, tags }, i) =>
    setTimeout(() => {
        sendDownloadRequest(url, tags)
    }, i * 60 * 1000),
)
// sendDownloadRequest('https://cooking.nytimes.com/recipes/1018097-kimchi-fried-rice', ['cooking', 'recipes'])

module.exports = { sendDownloadRequest }
