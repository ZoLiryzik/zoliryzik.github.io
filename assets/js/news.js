// Поиск по новостям
document.getElementById('news-search').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase()
  const articles = document.querySelectorAll('.news-article')
  let visibleCount = 0

  articles.forEach(article => {
      const searchData = article.dataset.search.toLowerCase()
      const content = article.textContent.toLowerCase()
      const isVisible = searchData.includes(searchTerm) || content.includes(searchTerm)
      article.style.display = isVisible ? 'block' : 'none'
      if (isVisible) visibleCount++
  })

  document.querySelector('.no-results').style.display = 
      visibleCount > 0 ? 'none' : 'block'
})
// ========== Domain Protection ==========
const DomainValidator = (() => {
  const validDomains = [
    'aHR0cHM6Ly96b2xpcnl6aWsucnU=',      // zoliryzik.ru
    //'aHR0cHM6Ly9zcnYuem9saXJ5emlrLnJ1', // srv.zoliryzik.ru
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
// Анимация новостей
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = 'translateY(0)'
      }
  })
})

document.querySelectorAll('.news-article').forEach(article => {
  article.style.transition = 'all 0.5s ease'
  observer.observe(article)
})
