// Загрузка новостей из JSON файла 233
async function loadNews() {
    const response = await fetch('../assets/json/news/news.json');
    const news = await response.json();
    const newsContainer = document.getElementById('newsContainer');

    news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <h2 id=${item.id}>${item.title}</h2>
            <p>${item.description}</p>
            <script>console.log('${item.id}')</script>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Поиск новостей
function searchNews() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const newsItems = document.getElementsByClassName('news-item');

    for (let i = 0; i < newsItems.length; i++) {
        const itemText = newsItems[i].textContent.toLowerCase();
        newsItems[i].style.display = itemText.includes(input) ? "" : "none";
    }
}

// Вызов функции загрузки новостей при загрузке страницы
window.onload = loadNews;
