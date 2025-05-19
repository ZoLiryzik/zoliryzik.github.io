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
    designeramp: [
      'aHR0cHM6Ly96b2xpcnl6aWsucnU=',
      'aHR0cHM6Ly9zcnYuem9saXJ5emlrLnJ1',
      'aHR0cHM6Ly96b2xpcnl6aWsuZ2l0aHViLmlv',
    ],
    visualRules: 'I3NpZGViYXItYnV0dG9uLCAuc2lkZWJhci1idXR0b24sIG5ld3Mtc2VjdGlvbiwgZmVlZC1jb250YWluZXIgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0KYm9keTo6YWZ0ZXIgewogICAgY29udGVudDogJyc7CiAgICBwb3NpdGlvbjogZml4ZWQ7CiAgICB0b3A6IDA7CiAgICBsZWZ0OiAwOwogICAgd2lkdGg6IDEwMCU7CiAgICBoZWlnaHQ6IDEwMCU7CiAgICBiYWNrZ3JvdW5kOiB1cmwoJ2h0dHBzOi8vem9saXJ5emlrLnJ1L3pvbGlyeXppazIvRnJhbWUyMC5wbmcnKSBuby1yZXBlYXQgY2VudGVyL2NvdmVyOwogICAgei1pbmRleDogOTk5OTsKICAgIHBvaW50ZXItZXZlbnRzOiBub25lOwp9CkBtZWRpYSAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwgKG1pbi1yZXNvbHV0aW9uOiAxOTJkcGkpIHsKCWJvZHk6OmFmdGVyIHsgYmFja2dyb3VuZC1pbWFnZTogdXJsKCdodHRwczovL3pvbGlyeXppay5ydS96b2xpcnl6aWsyL2RwaS5wbmcnKTsgfQp9CkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkgewoJYm9keTo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2h0dHBzOi8vem9saXJ5emlrLnJ1L3pvbGlyeXppazIvNDgwcHgucG5nJyk7IH0KfQ=='
  }
};

const CONTENT_ITEMS = [
  {
    timestamp: "19 мая 2025",
    heading: "Создан кастомный бот",
    body: "Добавлены в бота с отзывами, следующее: <br>1. Система отзывов - уже было<br>2. Сделано своё меню с информацией ( Раньше была в JB )<br>3. вывод в embed чего либо ( не доделано полностью )",
    labels: ["сервер", "кастомный бот", "обновление", "бот"],
    filterTerms: "отзывы бот обновление сервер кастомный бот"
  },
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

const ValidatorNews = (() => {
  const service = str => atob(str);
  const getValidator = () => 
    UI_SETTINGS.brand.designeramp.map(encoded => service(encoded));
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
  ValidatorNews.checkEnvironment();
  ContentRenderer.initialize();
});
