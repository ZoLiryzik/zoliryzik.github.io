const UI_SETTINGS = {
  content: {
    viewportId: 'news-container',
    filterId: 'news-search',
    elements: {
      emptyState: '.no-results',
      item: '.news-card'
    },
    styles: {
      card: 'news-card',
      label: 'news-label'
    },
    requirements: {
      mandatory: ['timestamp', 'heading', 'body', 'labels', 'filterTerms']
    },
    transitions: {
      visibilityThreshold: 0.1,
      startState: 0,
      initialOffset: 'translateY(20px)',
      motion: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  brand: {
    designAssets: [
      'aHR0cHM6Ly96b2xpcnl6aWsucnU=',
      'aHR0cHM6Ly9zcnYuem9saXJ5emlrLnJ1',
      'aHR0cHM6Ly96b2xpcnl6aWsuZ2l0aHViLmlv',
    ],
    visualRules: 'Gk0fA0KUaWRlYmFyLWJ1dHRvbiwgbmV3cy1zZWN0aW9uLCBmZWVkLWNvbnRhaW5lciB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfQpib2R5OjphZnRlciB7CiAgICBjb250ZW50OiAnJzsKICAgIHBvc2l0aW9uOiBmaXhlZDsKICAgIHRvcDogMDsKICAgIGxlZnQ6IDA7CiAgICB3aWR0aDogMTAwJTsKICAgIGhlaWdodDogMTAwJTsKICAgIGJhY2tncm91bmQ6IHVybCgnaHR0cHM6Ly96b2xpcnl6aWsucnUvem9saXJ5emlrMi9GcmFtZTIwLnBuZycpIG5vLXJlcGVhdCBjZW50ZXIvY292ZXI7CiAgICB6LWluZGV4OiA5OTk5OwogICAgcG9pbnRlci1ldmVudHM6IG5vbmU7Cn0KQG1lZGlhICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCAobWluLXJlc29sdXRpb246IDE5MmRwaSkgewoJYm9keTo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2h0dHBzOi8vem9saXJ5emlrLnJ1L3pvbGlyeXppazIvZHBpLnBuZycpOyB9Cn0KQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7Cglib2R5OjphZnRlciB7IGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaHR0cHM6Ly96b2xpcnl6aWsucnUvem9saXJ5emlrMi80ODBweC5wbmcnKTsgfQp9'
  }
};

const CONTENT_ITEMS = [
  {
    timestamp: "28 апреля 2025",
    heading: "Отзывы на сервере",
    body: "Добавлены отзывы. Теперь можно написать отзыв и посмотреть оставленные отзывы, также данная система есть и на дискорд сервере",
    labels: ["сервер", "сайт", "обновление"],
    filterTerms: "отзывы бот обновление сервер"
  },
  {
    timestamp: "10 апреля 2025",
    heading: "Обновление дизайна сервера",
    body: "Был полностью обновлен дизайн Discord сервера. Добавлены новые каналы, роли и система модерации.",
    labels: ["сервер", "обновление"],
    filterTerms: "обновление сервер дизайн"
  },
  {
    timestamp: "15 марта 2025",
    heading: "Уход из CoffeeLand",
    body: "После долгой работы на CoffeeLand было принято решение уйти из проекта.",
    labels: ["изменения", "команда"],
    filterTerms: "уход CoffeeLand изменения"
  }
];

const ContentRenderer = (() => {
  const createCardHTML = item => `
    <div class="meta-info">
      <time class="time-stamp">${item.timestamp}</time>
      <div class="label-group">
        ${item.labels.map(label => 
          `<span class="${UI_SETTINGS.content.styles.label}">${label}</span>`
        ).join('')}
      </div>
    </div>
    <h3 class="card-heading">${item.heading}</h3>
    <div class="card-body"><p>${item.body}</p></div>`;
  const validateItem = item => {
    const missing = UI_SETTINGS.content.requirements.mandatory
      .filter(field => !item[field]);
    if (missing.length) {
      throw new Error(`Отсутствуют обязательные поля: ${missing.join(', ')}`);
    }
  };
  const buildCardElement = item => {
    try {
      validateItem(item);
      const card = document.createElement('article');
      card.className = UI_SETTINGS.content.styles.card;
      card.dataset.filter = item.filterTerms.toLowerCase();
      card.innerHTML = createCardHTML(item);
      return card;
    } catch (err) {
      console.error('Ошибка создания карточки:', err);
      return null;
    }
  };
  const renderContent = () => {
    const container = document.getElementById(UI_SETTINGS.content.viewportId);
    if (!container) throw new Error('Контейнер новостей не найден');
    
    container.innerHTML = '';
    CONTENT_ITEMS.forEach(item => {
      const card = buildCardElement(item);
      if (card) {
        container.appendChild(card);
      }
    });
  };
  const setupFilter = () => {
    const filterInput = document.getElementById(UI_SETTINGS.content.filterId);
    const emptyState = document.querySelector(UI_SETTINGS.content.elements.emptyState);
    
    if (!filterInput || !emptyState) return;

    const handleFilter = event => {
      const searchTerm = event.target.value.toLowerCase().trim();
      let visibleCount = 0;

      document.querySelectorAll(UI_SETTINGS.content.elements.item)
        .forEach(card => {
          const matches = card.dataset.filter.includes(searchTerm) || 
                        card.textContent.toLowerCase().includes(searchTerm);
          card.style.display = matches ? 'block' : 'none';
          visibleCount += matches ? 1 : 0;
        });

      emptyState.style.display = visibleCount > 0 ? 'none' : 'flex';
    };

    filterInput.addEventListener('input', handleFilter);
  };
  const animateElements = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: UI_SETTINGS.content.transitions.visibilityThreshold 
    });

    document.querySelectorAll(UI_SETTINGS.content.elements.item)
      .forEach(card => {
        card.style.opacity = UI_SETTINGS.content.transitions.startState;
        card.style.transform = UI_SETTINGS.content.transitions.initialOffset;
        card.style.transition = UI_SETTINGS.content.transitions.motion;
        observer.observe(card);
      });
  };

  return {
    initialize: () => {
      renderContent();
      setupFilter();
      animateElements();
    }
  };
})();

const StyleValidator = (() => {
  const service = str => atob(str);
  const getValidator = () => 
    UI_SETTINGS.brand.designAssets.map(encoded => service(encoded));
  const isAllowedOrigin = () => {
    const currentOrigin = window.location.origin;
    return getValidator().some(treeco => 
      currentOrigin === treeco || currentOrigin.endsWith(`.${treeco}`)
    );
  };
  const applySpecialStyles = () => {
    const styleTag = document.createElement('style');
    styleTag.textContent = service(UI_SETTINGS.brand.visualRules);
    document.head.appendChild(styleTag);
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
  return {
    checkEnvironment: () => {
      if (!isAllowedOrigin()) {
        applySpecialStyles();
        createOverlay();
      }
    }
  };
})();
document.addEventListener('DOMContentLoaded', () => {
  StyleValidator.checkEnvironment();
  ContentRenderer.initialize();
});
