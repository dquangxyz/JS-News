'use strict';
const newContainer = document.getElementById('news-container');
const page = document.getElementById('page-num');
const nextBtn = document.getElementById('btn-next');
const previousBtn = document.getElementById('btn-prev');

const keyCurrentUser = "CURRENT_USER"
const currentUser =  getFromStorage(keyCurrentUser) ? parseUser(getFromStorage(keyCurrentUser)) : null

let totalResults = 0;
const country = "au"
const category = currentUser.settings.category
const pageSize = currentUser.settings.pageSize
let pageNum = 1;



// get data from API by async and await function
const getNews = async function(countryCode, categoryName) {
  try {
    // Load data
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${categoryName}&pageSize=${pageSize}&page=${pageNum}&language=en&apiKey=074deb8e504f40409d9fe584df576d4c`)
    const data = await res.json()
    console.log(data)
    console.log('Currently in page ' + pageNum)

    // Show/hide Previous & Next button
    if (pageNum == 1) {
      previousBtn.style.display = 'none';
      nextBtn.style.display = 'block';
    } else if (pageNum == Math.ceil(data.totalResults / pageSize)) {
      previousBtn.style.display = 'block';
      nextBtn.style.display = 'none';
    } else {
      previousBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    }

    // Render articles
    renderNews(data.articles)

  } catch (err) {
    console.log(err.message)
  }
}

// Call getNews function
getNews(country, category)

// addEventListener for Previous Button
previousBtn.addEventListener('click', function () {
  pageNum--
  page.textContent = pageNum
  getNews(country, category);
});

// addEventListener for Next Button
nextBtn.addEventListener('click', function () {
  pageNum++
  page.textContent = pageNum
  getNews(country, category);
});

// Define function
function renderNews(articles){
  newContainer.innerHTML = '';
  articles.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = 
    `<div class="card flex-row flex-wrap">
          <div class="card mb-3" style="">
          <div class="row no-gutters">
              <div class="col-md-4">
                <img src=${item.urlToImage} class="card-img" alt="image">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <a href=${item.url}
                    class="btn btn-primary">View</a>
                </div>
              </div>
          </div>
        </div>
    </div>`;
    newContainer.appendChild(row)
  })
}
