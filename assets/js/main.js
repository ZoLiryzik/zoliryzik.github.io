// ======================= ГЛОБАЛЬНЫЕ НАСТРОЙКИ =======================
const APP_CONFIG = {
  news: {
    containerId: 'news-container',
    searchInputId: 'news-search',
    selectors: {
      noResults: '.no-results',
      article: '.news-article'
    },
    classes: {
      article: 'news-article',
      tag: 'news-tag'
    },
    validation: {
      requiredFields: ['date', 'title', 'content', 'tags', 'searchKeys']
    },
    animation: {
      observerThreshold: 0.1,
      initialOpacity: 0,
      initialTransform: 'translateY(20px)',
      transitionEffect: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  google: {
    horizon: [
      'aHR0cHM6Ly96b2xpcnl6aWsucnU=',      // z gdfgdfggdgdf
      'aHR0cHM6Ly9zcnYuem9saXJ5emlrLnJ1', // sr gfgdfdgdf
      'aHR0cHM6Ly96b2xpcnl6aWsuZ2l0aHViLmlv', // zg dsadsa
    ],
    CueDesigns: 'Gk0fA0KUaWRlYmFyLWJ1dHRvbiwgbmV3cy1zZWN0aW9uLCBmZWVkLWNvbnRhaW5lciB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfQpib2R5OjphZnRlciB7CiAgICBjb250ZW50OiAnJzsKICAgIHBvc2l0aW9uOiBmaXhlZDsKICAgIHRvcDogMDsKICAgIGxlZnQ6IDA7CiAgICB3aWR0aDogMTAwJTsKICAgIGhlaWdodDogMTAwJTsKICAgIGJhY2tncm91bmQ6IHVybCgnaHR0cHM6Ly96b2xpcnl6aWsucnUvem9saXJ5emlrMi9GcmFtZTIwLnBuZycpIG5vLXJlcGVhdCBjZW50ZXIvY292ZXI7CiAgICB6LWluZGV4OiA5OTk5OwogICAgcG9pbnRlci1ldmVudHM6IG5vbmU7Cn0KQG1lZGlhICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCAobWluLXJlc29sdXRpb246IDE5MmRwaSkgewoJYm9keTo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2h0dHBzOi8vem9saXJ5emlrLnJ1L3pvbGlyeXppazIvZHBpLnBuZycpOyB9Cn0KQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7Cglib2R5OjphZnRlciB7IGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaHR0cHM6Ly96b2xpcnl6aWsucnUvem9saXJ5emlrMi80ODBweC5wbmcnKTsgfQp9'
  }
};

// ======================= ДАННЫЕ =======================
const NEWS_DATA = [
  {
    date: "28 апреля 2025",
    title: "Отзывы на сервере",
    content: "Добавлены отзывы. Теперь можно написать отзыв и посмотреть оставленные отзывы...",
    tags: ["сервер", "сайт", "обновление"],
    searchKeys: "отзывы бот обновление сервер"
  },
  {
    date: "10 апреля 2025",
    title: "Обновление дизайна сервера",
    content: "Был полностью обновлен дизайн Discord сервера...",
    tags: ["сервер", "обновление"],
    searchKeys: "обновление сервер дизайн"
  },
  {
    date: "15 марта 2025",
    title: "Изменения в команде",
    content: "После долгой работы на CoffeeLand...",
    tags: ["изменения", "команда"],
    searchKeys: "уход CoffeeLand изменения"
  }
];

// ======================= СИСТЕМА НОВОСТЕЙ =======================
const NewsManager = (() => {
  const generateArticleHTML = article => `
    <div class="news-meta">
      <time class="news-date">${article.date}</time>
      <div class="news-tags">
        ${article.tags.map(tag => 
          `<span class="${APP_CONFIG.news.classes.tag}">${tag}</span>`
        ).join('')}
      </div>
    </div>
    <h3 class="news-title">${article.title}</h3>
    <div class="news-content"><p>${article.content}</p></div>`;

  const validateArticle = article => {
    if (!article || typeof article !== 'object') 
      throw new Error('Некорректный объект статьи');
    
    const missing = APP_CONFIG.news.validation.requiredFields
      .filter(f => !article[f]);
    if (missing.length) 
      throw new Error(`Отсутствуют поля: ${missing.join(', ')}`);
  };

  const createNewsElement = article => {
    try {
      validateArticle(article);
      const element = document.createElement('article');
      element.className = APP_CONFIG.news.classes.article;
      element.dataset.search = article.searchKeys.toLowerCase();
      element.innerHTML = generateArticleHTML(article);
      return element;
    } catch (error) {
      console.error('Ошибка создания статьи:', error);
      return null;
    }
  };

  const initializeNewsContainer = () => {
    const container = document.getElementById(APP_CONFIG.news.containerId);
    if (!container) throw new Error('Контейнер новостей не найден');
    
    container.innerHTML = '';
    if (!Array.isArray(NEWS_DATA)) 
      throw new Error('Некорректный формат данных новостей');
    
    NEWS_DATA.forEach(article => {
      const element = createNewsElement(article);
      element && container.appendChild(element);
    });
  };

  const setupSearchFeature = () => {
    const searchInput = document.getElementById(APP_CONFIG.news.searchInputId);
    const noResults = document.querySelector(APP_CONFIG.news.selectors.noResults);
    if (!searchInput || !noResults) return;

    const handleSearch = ({ target }) => {
      const term = target.value.toLowerCase().trim();
      let visibleCount = 0;

      document.querySelectorAll(APP_CONFIG.news.selectors.article)
        .forEach(article => {
          const isVisible = article.dataset.search.includes(term) || 
                          article.textContent.toLowerCase().includes(term);
          article.style.display = isVisible ? 'block' : 'none';
          visibleCount += isVisible ? 1 : 0;
        });

      noResults.style.display = visibleCount ? 'none' : 'flex';
    };

    searchInput.addEventListener('input', handleSearch);
  };

  const initializeAnimations = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: APP_CONFIG.news.animation.observerThreshold });

    document.querySelectorAll(APP_CONFIG.news.selectors.article)
      .forEach(article => {
        Object.assign(article.style, {
          opacity: APP_CONFIG.news.animation.initialOpacity,
          transform: APP_CONFIG.news.animation.initialTransform,
          transition: APP_CONFIG.news.animation.transitionEffect
        });
        observer.observe(article);
      });
  };

  return {
    init: () => {
      initializeNewsContainer();
      setupSearchFeature();
      initializeAnimations();
    }
  };
})();

// ======================= ЗАЩИТА ДОКУМЕНТОВ =======================
const DocumentSecurity = (() => {
  const decodeBase64 = str => atob(str);
  
  const getDecodedDomains = () => 
    APP_CONFIG.google.horizon.map(d => decodeBase64(d));

  const checkCurrentDomain = () => {
    const current = window.location.origin;
    return getDecodedDomains().some(d => 
      current === d || current.endsWith(`.${d}`)
    );
  };

  const applySecurityStyles = () => {
    const style = document.createElement('style');
    style.textContent = decodeBase64(APP_CONFIG.google.CueDesigns);
    document.head.appendChild(style);
  };

  const createOverlay = () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.prepend(overlay);
  };

  const displaySecurityWarning = () => {
    applySecurityStyles();
    createOverlay();
  };

  return {
    initialize: () => !checkCurrentDomain() && displaySecurityWarning()
  };
})();

// ======================= ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =======================
document.addEventListener('DOMContentLoaded', () => {
  DocumentSecurity.initialize();
  NewsManager.init();
});