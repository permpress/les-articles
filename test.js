require('dotenv').config()

const octokit = new Octokit({
    auth: process.env.PAT,
})

export async function sendDownloadRequest(url, tags) {
    return octokit.request('POST /repos/{owner}/{repo}/dispatches', {
        owner: 'laudebugs',
        repo: 'les-articles',
        event_type: 'download-webpage',
        client_payload: {
            url,
            tags,
        },
    })
}
