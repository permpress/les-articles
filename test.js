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
        url: 'https://simonwillison.net/2022/Aug/29/stable-diffusion/',
        tags: ['ai', 'machine-learning', 'software-engineering'],
    },
    {
        url: 'https://www.browserlondon.com/blog/2022/08/30/why-user-stories-belong-in-the-garbage/',
        tags: ['dev-ops', 'software-engineering'],
    },
    {
        url: 'https://wagslane.dev/posts/no-one-does-devops/',
        tags: ['dev-ops', 'software-engineering'],
    },
    {
        url: 'https://jvns.ca/blog/2022/08/30/a-way-to-categorize-debugging-skills/',
        tags: ['software-engineering', 'debugging'],
    },
    {
        url: 'https://blog.southparkcommons.com/move-fast-or-die/',
        tags: ['entrepreneurship', 'software-engineering'],
    },
    {
        url: 'https://collabfund.com/blog/save-like-a-pessimist-invest-like-an-optimist/',
        tags: ['investmant', 'life-hacks'],
    },
    {
        url: 'http://paulgraham.com/fr.html?utm_source=pocket_mylist',
        tags: ['start-ups', 'investment'],
    },
    {
        url: 'https://www.piratewires.com/p/jump-23d06adb4cb7',
        tags: ['life-hacks'],
    },
    {
        url: 'https://alexanderwales.com/the-ai-art-apocalypse/',
        tags: ['ai', 'machine-learning', 'software-engineering'],
    },
    {
        url: 'https://lucasfcosta.com/2022/08/07/how-to-improve-daily-standups.html',
        tags: ['dev-ops'],
    },
]

jobs.map(({ url, tags }) => sendDownloadRequest(url, tags))
// sendDownloadRequest('https://cooking.nytimes.com/recipes/1018097-kimchi-fried-rice', ['cooking', 'recipes'])

module.exports = { sendDownloadRequest }
