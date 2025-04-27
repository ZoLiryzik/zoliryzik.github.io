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
    document.getElementById('news-search').addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const articles = document.querySelectorAll('.news-article');
      let visibleCount = 0;
  
      articles.forEach(article => {
        const searchData = article.dataset.search.toLowerCase();
        const content = article.textContent.toLowerCase();
        const isVisible = searchData.includes(searchTerm) || content.includes(searchTerm);
        article.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
      });
  
      document.querySelector('.no-results').style.display = 
        visibleCount > 0 ? 'none' : 'block';
    });
  }
  
  function initNewsAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });
  
    document.querySelectorAll('.news-article').forEach(article => {
      article.style.transition = 'all 0.5s ease';
      observer.observe(article);
    });
  }
  
  // ========== Video Functions ==========
  function initVideo() {
    // YouTube Player API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    // Player initialization
    window.onYouTubeIframeAPIReady = () => {
      new YT.Player('youtube_video', {
        height: '390',
        width: '640',
        videoId: 'dQw4w9WgXcQ', // Замените на ID вашего видео
        events: {
          'onReady': (event) => event.target.playVideo()
        }
      });
    };
  
    // Video resize handler
    function resizeVideo() {
      const video = document.getElementById('youtube_video');
      
    }
  
    window.addEventListener('resize', resizeVideo);
    resizeVideo();
  }
  
  // ========== Main Initialization ==========
  document.addEventListener('DOMContentLoaded', () => {
    initNews();
    initNewsSearch();
    initNewsAnimations();
    initVideo();
  });
