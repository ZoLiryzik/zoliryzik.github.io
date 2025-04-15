// Массив с новостями
const newsData = [
    {
        date: "10 апреля 2024",
        title: "Обновление дизайна сервера",
        content: "Был полностью обновлен дизайн Discord сервера. Добавлены новые каналы, роли и система модерации.",
        tags: ["сервер", "обновление"],
        searchKeys: "обновление сервер дизайн"
    },
    {
        date: "15 марта 2024",
        title: "Изменения в команде",
        content: "После долгой работы на CoffeeLand было принято решение сосредоточиться на развитии собственного сообщества.",
        tags: ["изменения", "команда"],
        searchKeys: "уход CoffeeLand изменения"
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