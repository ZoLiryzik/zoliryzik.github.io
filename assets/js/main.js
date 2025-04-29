// ========== News Data ==========
const newsData = [
  {
    date: "28 апреля 2025",
    title: "Отзывы на сервере",
    content: "Добавлены отзывы. Теперь можно написать отзыв и посмотреть оставленные отзывы, также данная система есть и на дискорд сервере",
    tags: ["сервер", "сайт", "обновление"],
    searchKeys: "отзывы бот обновление сервер"
  },
  {
    date: "10 апреля 2025",
    title: "Обновление дизайна сервера",
    content: "Был полностью обновлен дизайн Discord сервера. Добавлены новые каналы, роли и система модерации.",
    tags: ["сервер", "обновление"],
    searchKeys: "обновление сервер дизайн"
  },
  {
    date: "15 марта 2025",
    title: "Изменения в команде",
    content: "После долгой работы на CoffeeLand было принято решение сосредоточиться на развитии собственного сообщества.",
    tags: ["изменения", "команда"],
    searchKeys: "уход CoffeeLand изменения"
  }
];

// ========== News Functions ==========
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

function initNews() {
  const container = document.getElementById('news-container');
  newsData.forEach(article => {
    container.appendChild(createNewsArticle(article));
  });
}

function initNewsSearch() {
  const searchInput = document.getElementById('news-search');
  const noResults = document.querySelector('.no-results');
  
  const searchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    document.querySelectorAll('.news-article').forEach(article => {
      const matches = article.dataset.search.toLowerCase().includes(searchTerm) ||
                     article.textContent.toLowerCase().includes(searchTerm);
      article.style.display = matches ? 'block' : 'none';
      if (matches) visibleCount++;
    });

    noResults.style.display = visibleCount ? 'none' : 'block';
  };

  searchInput.addEventListener('input', searchHandler);
}

function initNewsAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.style.opacity = entry.isIntersecting ? 1 : 0;
      entry.target.style.transform = entry.isIntersecting ? 'translateY(0)' : 'translateY(20px)';
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.news-article').forEach(article => {
    article.style.transition = 'all 0.5s ease';
    observer.observe(article);
  });
}

// ========== Domain Protection ==========
const DOMAIN_PROTECTION = (() => {
  const encoded = [
    'em9saXJ5emlrLnJ1',         // zoliryzik.ru
    'c3J2LnpvbGlyeXppay5ydQ==', // srv.zoliryzik.ru
    'em9saXJ5emlrLmdpdGh1Yi5pbw==' // zoliryzik.github.io
  ];

  const domains = encoded.map(d => atob(d));
  const currentOrigin = window.location.origin;

  return {
    isAllowed: domains.some(d => 
      currentOrigin === `https://${d}` || 
      currentOrigin === `http://${d}` ||
      currentOrigin.includes(`.${d}`)
  };
})();

if (!DOMAIN_PROTECTION.isAllowed) {
  const warning = document.createElement('div');
  warning.innerHTML = `
    <div style="position:fixed;top:0;left:0;right:0;background:#dc3545;color:white;
      padding:12px;text-align:center;z-index:9999;font-family:sans-serif;backdrop-filter:blur(5px)">
      ⚠️ Неофициальная копия! Оригинальный сайт: 
      <a href="https://zoliryzik.ru" 
         style="color:white;text-decoration:underline;font-weight:bold">
        zoliryzik.ru
      </a>
    </div>
  `;
  document.body.prepend(warning);
}

// ========== Video Player ==========
function initVideo() {
  const videoContainer = document.getElementById('youtube_video');
  if (!videoContainer) return;

  const loadYT = () => {
    window.YT.ready(() => {
      new YT.Player(videoContainer, {
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (e) => e.target.setPlaybackQuality('hd1080')
        }
      });
    });
  };

  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onload = loadYT;
    document.head.appendChild(tag);
  } else {
    loadYT();
  }
}

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
  initNews();
  initNewsSearch();
  initNewsAnimations();
  initVideo();
});
