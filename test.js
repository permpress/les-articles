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

sendDownloadRequest('https://www.joshwcomeau.com/react/why-react-re-renders/', ['react', 'web-dev'])

module.exports = { sendDownloadRequest }
