// ========== News System ==========
const NewsManager = (() => {
  // Конфигурация
  const config = {
    containerId: 'news-container',
    searchId: 'news-search',
    noResultsClass: 'no-results'
  };

  // Данные новостей
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

  // Создание элемента новости
  const createNewsArticle = article => {
    try {
      if (!article || typeof article !== 'object') {
        throw new Error('Invalid article object');
      }

      const requiredFields = ['date', 'title', 'content', 'tags', 'searchKeys'];
      const missingFields = requiredFields.filter(field => !article[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing fields: ${missingFields.join(', ')}`);
      }

      const articleEl = document.createElement('article');
      articleEl.className = 'news-article';
      articleEl.dataset.search = article.searchKeys.toLowerCase();

      articleEl.innerHTML = `
        <div class="news-meta">
          <time class="news-date">${article.date}</time>
          <div class="news-tags">${
            article.tags.map(tag => 
              `<span class="news-tag">${tag}</span>`
            ).join('')
          }</div>
        </div>
        <h3 class="news-title">${article.title}</h3>
        <div class="news-content">
          <p>${article.content}</p>
        </div>
      `;

      return articleEl;
    } catch (error) {
      console.error('Article creation error:', error);
      return null;
    }
  };

  // Инициализация новостей
  const initNews = () => {
    const container = document.getElementById(config.containerId);
    
    if (!container) {
      console.error(`News container (#${config.containerId}) not found!`);
      return;
    }

    container.innerHTML = '';

    if (!newsData || !Array.isArray(newsData)) {
      console.error('Invalid news data format');
      return;
    }

    newsData.forEach(article => {
      const element = createNewsArticle(article);
      element && container.appendChild(element);
    });
  };

  // Поиск новостей
  const initSearch = () => {
    const searchInput = document.getElementById(config.searchId);
    const noResults = document.querySelector(`.${config.noResultsClass}`);

    if (!searchInput || !noResults) {
      console.error('Search elements not found');
      return;
    }

    const handleSearch = event => {
      const term = event.target.value.toLowerCase().trim();
      let visibleCount = 0;

      document.querySelectorAll('.news-article').forEach(article => {
        const matches = article.dataset.search.includes(term) || 
                       article.textContent.toLowerCase().includes(term);
        article.style.display = matches ? 'block' : 'none';
        visibleCount += matches ? 1 : 0;
      });

      noResults.style.display = visibleCount ? 'none' : 'flex';
    };

    searchInput.addEventListener('input', handleSearch);
  };

  // Анимации
  const initAnimations = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.news-article').forEach(article => {
      article.style.opacity = 0;
      article.style.transform = 'translateY(20px)';
      article.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(article);
    });
  };

  return {
    init: () => {
      initNews();
      initSearch();
      initAnimations();
    }
  };
})();

// ========== Domain Protection ==========
const DomainValidator = (() => {
  const validDomains = [
    'aHR0cHM6Ly96b2xpcnl6aWsucnU=',      // zoliryzik.ru
    'aHR0cHM6Ly9zcnYuem9saXJ5emlrLnJ1', // srv.zoliryzik.ru
    'aHR0cHM6Ly96b2xpcnl6aWsuZ2l0aHViLmlv' // zoliryzik.github.io
  ].map(d => atob(d));

  const checkDomain = () => {
    const current = window.location.origin;
    return validDomains.some(d => current === d || current.endsWith(`.${d}`));
  };

  const showWarning = () => {
    const warning = document.createElement('div');
    warning.innerHTML = `
      <div class="domain-warning">
        ⚠️ Это копия сайта! Посетите официальный ресурс: 
        <a href="https://zoliryzik.ru" target="_blank">zoliryzik.ru</a>
      </div>
    `;
    document.body.prepend(warning);
  };

  return {
    init: () => !checkDomain() && showWarning()
  };
})();

// ========== YouTube Player ==========
const VideoPlayer = (() => {
  const config = {
    containerId: 'youtube_video',
    videoId: 'dQw4w9WgXcQ',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0
    }
  };

  const initPlayer = () => {
    if (!document.getElementById(config.containerId)) return;

    window.onYouTubeIframeAPIReady = () => {
      new YT.Player(config.containerId, {
        width: '100%',
        height: '100%',
        videoId: config.videoId,
        playerVars: config.playerVars
      });
    };

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  };

  return { init: initPlayer };
})();

// ========== Main Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
  DomainValidator.init();
  NewsManager.init();
  VideoPlayer.init();
});
