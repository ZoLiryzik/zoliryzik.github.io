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