const fetchDB = async () => {
    return fetch('./assets/db.min.json').then((res) => res.json())
}

const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
}

fetchDB().then((db) => {
    console.log(db)
})

const appendArticle = (article) => {
    const meta = article.metadata
    return ` <ion-item class="article-item" button>
<ion-grid>
    <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-col size-xl="10" size-md="9.5" size-xs="12">
          <ion-grid>
            <ion-row>
              <ion-text>
                <h2>${meta.title}</h2>
              </ion-text>
            </ion-row>
            <ion-row >
            ${
                meta.publisher
                    ? `<ion-col size-xl="2" size-md="3" size-sm="4" style="padding-left: 0;">
                <ion-grid class="ion-no-padding">
                  <ion-row class="ion-align-items-center"> 
                    <ion-text color="dark" style="padding-left: 6px;">
                     <small>by ${meta.publisher}</small> </ion-text></ion-row>
                </ion-grid>
              </ion-col>`
                    : ''
            }
           
              ${
                  meta.date
                      ? `<ion-col size-xl="2.5" size-md="3" size-sm="4">
               <ion-grid class="ion-no-padding">
                  <ion-row class="ion-align-items-center"> <ion-icon name="calendar-outline"></ion-icon>
                    <ion-text color="dark" style="padding-left: 6px;">
                     <small>${formatDate(meta.date)}</small> </ion-text></ion-row>
                </ion-grid>
              </ion-col>`
                      : ''
              }
           
              <ion-col size-xl="2" size-md="3" size-sm="4" >
                <ion-grid class="ion-no-padding">
                  <ion-row class="ion-align-items-center"> <ion-icon color="primary" name="planet-outline"></ion-icon>
                    <ion-text color="primary" style="padding-left: 6px;">
                      <a href="https://${article.domain}" target="_blank"><small>${article.domain}</small> </ion-text></a>
                     </ion-row>
                </ion-grid>
              </ion-col>
              
            </ion-row>
           ${`<ion-row  onclick="buttonClick('./pages/${article.path}')"><p>${meta.description ?? 'Read More'}</p></ion-row>`}
          </ion-grid>
        </ion-col>
        <ion-col size-xl="2" size-md="2.5" size-xs="12">
            <img src="${meta['image'] ?? './assets/default-image.jpeg'}">
      </ion-col>
    </ion-row>
</ion-grid>
</ion-item>`
}

let container = document.getElementById('content-container')
fetchDB().then((db) => {
    db.articles.forEach((article) => {
        container.innerHTML += appendArticle(article)
    })
})
