// Для Node.js (GitHub Actions)
const SHEET_ID = '1f2Ka0lWqId-KAZBggq3tDD-WHy_Ggu-0X8_CpZiB7IM';
const SHEET_NAME = 'Ответы';
const SCROLL_SPEED = 40;
const DUPLICATE_INTERVAL = 1; // 40 секунд
const MAX_DUPLICATES = 10;

let scrollAnimationFrame = null;
let isScrolling = true;
let commentsWrapper = null;
let currentPosition = 0;
let contentWidth = 0;
let originalComments = [];
let duplicateCount = 0;
let duplicationInterval = null;

function duplicateComments() {
    if (!commentsWrapper || duplicateCount >= MAX_DUPLICATES) {
        clearInterval(duplicationInterval);
        return;
    }
    
    // Создаем клоны и добавляем их
    const clones = originalComments.map(el => el.cloneNode(true));
    commentsWrapper.append(...clones);
    duplicateCount++;
    
    // Обновляем параметры анимации
    contentWidth = commentsWrapper.scrollWidth / 2;
    currentPosition = currentPosition % contentWidth;
}

function startAutoScroll() {
    if (!commentsWrapper || !originalComments.length) return;

    // Очистка предыдущих клонов
    while (commentsWrapper.children.length > originalComments.length) {
        commentsWrapper.lastChild.remove();
    }

    // Сброс параметров дублирования
    duplicateCount = 0;
    clearInterval(duplicationInterval);
    duplicationInterval = setInterval(duplicateComments, DUPLICATE_INTERVAL);

    // Первоначальное заполнение
    duplicateComments();

    function animate() {
        if (!isScrolling) {
            scrollAnimationFrame = requestAnimationFrame(animate);
            return;
        }

        currentPosition += (SCROLL_SPEED * 16.6) / 1000;
        
        if (currentPosition >= contentWidth) {
            currentPosition = 0;
            commentsWrapper.style.transform = `translateX(0)`;
        }

        commentsWrapper.style.transform = `translateX(-${currentPosition}px)`;
        scrollAnimationFrame = requestAnimationFrame(animate);
    }

    cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = requestAnimationFrame(animate);
}

function initEventHandlers() {
    const feedContainer = document.querySelector('.feed-container');
    
    const pauseScroll = () => {
        isScrolling = false;
        commentsWrapper.style.transition = 'transform 0.5s ease-out';
    };

    const resumeScroll = () => {
        isScrolling = true;
        commentsWrapper.style.transition = 'none';
        startAutoScroll();
    };

    feedContainer.addEventListener('mouseenter', pauseScroll);
    feedContainer.addEventListener('mouseleave', resumeScroll);
    feedContainer.addEventListener('touchstart', pauseScroll);
    feedContainer.addEventListener('touchend', resumeScroll);
}

function processData(data) {
    const container = document.getElementById('data-container');
    
    if (!data.rows || data.rows.length <= 1) {
        container.innerHTML = '<div class="no-comments">Пока нет отзывов</div>';
        return;
    }

    originalComments = data.rows.reverse().map(row => {
        const [dateCol, authorCol, ratingCol, textCol] = row.c;
        const comment = document.createElement('div');
        comment.className = 'comment';

        // Используем textContent для предотвращения XSS
        const author = document.createElement('div');
        author.className = 'comment-author';
        author.textContent = authorCol?.v || 'Аноним';

        const date = document.createElement('div');
        date.className = 'comment-date';
        date.textContent = dateCol?.f || '';

        const commentText = document.createElement('div');
        commentText.className = 'comment-text';
        commentText.textContent = textCol?.v || '';

        const rating = document.createElement('div');
        rating.className = 'comment-rating';
        if (ratingCol?.v) {
            rating.textContent = `★ ${Math.round(ratingCol.v)}/5`;
        }

        comment.appendChild(author);
        comment.appendChild(date);
        comment.appendChild(commentText);
        if (ratingCol?.v) {
            comment.appendChild(rating);
        }

        return comment;
    });

    container.innerHTML = '';
    originalComments.forEach(comment => container.appendChild(comment));
    commentsWrapper = container;

    setTimeout(() => {
        initEventHandlers();
        startAutoScroll();
    }, 300);
}

function loadData() {
    fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`)
        .then(r => r.text())
        .then(t => {
            try {
                const json = JSON.parse(t.substring(47).slice(0, -2));
                processData(json.table);
            } catch(e) {
                console.error('Ошибка данных:', e);
                document.getElementById('data-container').innerHTML = 
                    '<div class="no-comments">Ошибка загрузки данных</div>';
            }
        })
        .catch(e => {
            console.error('Ошибка сети:', e);
            document.getElementById('data-container').innerHTML = 
                '<div class="no-comments">Нет соединения</div>';
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    window.addEventListener('resize', () => {
        if (commentsWrapper) {
            contentWidth = commentsWrapper.scrollWidth / 2;
        }
    });
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(scrollAnimationFrame);
        clearInterval(duplicationInterval);
    } else {
        startAutoScroll();
    }
});
