// Массив с новостями
const newsData = [
    {
        date: "21 апреля 2025",
        title: "Добавлена страници с кодами JB",
        content: "Полностью сделана страница с кодами JB.",
        tags: ["изменения", "сайт"],
        searchKeys: "уход CoffeeLand изменения"
    },
    {
        date: "10 апреля 2025",
        title: "Обновление дизайна сервера",
        content: "Был полностью обновлен дизайн Discord сервера. Добавлены новые каналы, роли и система модерации.",
        tags: ["сервер", "обновление"],
        searchKeys: "обновление сервер дизайн"
    }
];

// Функция создания HTML-структуры новости
function createNewsArticle(article) {
    const articleEl = document.createElement('div');
    articleEl.className = 'news-article';
    articleEl.dataset.search = article.searchKeys;

    articleEl.innerHTML = `
        <div class="news-date">${article.date}</div>
        <h3 class="news-title">${article.title}</h3>
        <div class="news-content">
            <p>${article.content}</p>
        </div>
        <div class="news-tags">
            ${article.tags.map(tag => `<span class="news-tag">${tag}</span>`).join('')}
        </div>
    `;

    return articleEl;
}

// Инициализация новостей
export function initNews() {
    const container = document.getElementById('news-container');
    
    newsData.forEach(article => {
        container.appendChild(createNewsArticle(article));
    });
}
