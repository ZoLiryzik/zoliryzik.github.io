const CONFIG = {
    SHEET_ID: '1f2Ka0lWqId-KAZBggq3tDD-WHy_Ggu-0X8_CpZiB7IM',
    SHEET_NAME: 'Ответы',
    SCROLL_SPEED: 40,
    DUPLICATE_INTERVAL: 40000, // 40 секунд в миллисекундах
    MAX_DUPLICATES: 10,
    CACHE_TTL: 300000 // 5 минут кэширования
};

let state = {
    scrollAnimationFrame: null,
    isScrolling: true,
    commentsWrapper: null,
    currentPosition: 0,
    contentWidth: 0,
    originalComments: [],
    duplicateCount: 0,
    duplicationInterval: null,
    cachedData: null,
    lastFetchTime: 0
};

// Единая функция для управления анимацией
const animate = () => {
    if (!state.isScrolling) return;
    
    state.currentPosition += (CONFIG.SCROLL_SPEED * 16.6) / 1000;
    
    if (state.currentPosition >= state.contentWidth) {
        state.currentPosition = 0;
        state.commentsWrapper.style.transform = `translateX(0)`;
    }

    state.commentsWrapper.style.transform = `translateX(-${state.currentPosition}px)`;
    state.scrollAnimationFrame = requestAnimationFrame(animate);
};

const manageClones = () => {
    if (!state.commentsWrapper || state.duplicateCount >= CONFIG.MAX_DUPLICATES) {
        clearInterval(state.duplicationInterval);
        return;
    }
    
    const fragment = document.createDocumentFragment();
    state.originalComments.forEach(el => fragment.appendChild(el.cloneNode(true)));
    state.commentsWrapper.appendChild(fragment);
    
    state.duplicateCount++;
    state.contentWidth = state.commentsWrapper.scrollWidth / 2;
    state.currentPosition %= state.contentWidth;
};

const initScroll = () => {
    if (!state.commentsWrapper || !state.originalComments.length) return;

    // Очистка через замену содержимого
    const newWrapper = state.commentsWrapper.cloneNode(false);
    newWrapper.append(...state.originalComments);
    state.commentsWrapper.replaceWith(newWrapper);
    state.commentsWrapper = newWrapper;

    state.duplicateCount = 0;
    state.duplicationInterval = setInterval(manageClones, CONFIG.DUPLICATE_INTERVAL);
    manageClones();

    cancelAnimationFrame(state.scrollAnimationFrame);
    state.scrollAnimationFrame = requestAnimationFrame(animate);
};

const eventHandlers = {
    pause: () => {
        state.isScrolling = false;
        state.commentsWrapper.style.transition = 'transform 0.5s ease-out';
    },
    resume: () => {
        state.isScrolling = true;
        state.commentsWrapper.style.transition = 'none';
        initScroll();
    }
};

const processData = (data) => {
    const container = document.getElementById('data-container');
    
    if (!data.rows || data.rows.length <= 1) {
        container.innerHTML = '<div class="no-comments">Пока нет отзывов</div>';
        return;
    }

    // Кэширование данных
    if (JSON.stringify(state.cachedData) !== JSON.stringify(data)) {
        state.originalComments = data.rows.reverse().map(row => {
            const [dateCol, authorCol, ratingCol, textCol] = row.c;
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.innerHTML = `
                <div class="comment-header">
                    <div class="comment-author">${authorCol?.v || 'Аноним'}</div>
                    <div class="comment-date">${dateCol?.f || ''}</div>
                </div>
                <div class="comment-text">${textCol?.v || ''}</div>
                ${ratingCol?.v ? `<div class="comment-rating">★ ${Math.round(ratingCol.v)}/5</div>` : ''}
            `;
            return comment;
        });
        state.cachedData = data;
    }

    container.replaceChildren(...state.originalComments);
    state.commentsWrapper = container;

    // Задержка инициализации через RAF
    requestAnimationFrame(() => {
        const feedContainer = document.querySelector('.feed-container');
        feedContainer.addEventListener('mouseenter', eventHandlers.pause);
        feedContainer.addEventListener('mouseleave', eventHandlers.resume);
        feedContainer.addEventListener('touchstart', eventHandlers.pause);
        feedContainer.addEventListener('touchend', eventHandlers.resume);
        
        initScroll();
    });
};

const loadData = () => {
    const now = Date.now();
    if (now - state.lastFetchTime < CONFIG.CACHE_TTL && state.cachedData) {
        processData(state.cachedData);
        return;
    }

    fetch(`https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${CONFIG.SHEET_NAME}`)
        .then(r => r.text())
        .then(t => {
            try {
                const json = JSON.parse(t.substring(47).slice(0, -2));
                state.lastFetchTime = Date.now();
                processData(json.table);
            } catch(e) {
                console.error('Ошибка данных:', e);
                document.getElementById('data-container').innerHTML = 
                    '<div class="no-comments">Ошибка загрузки данных</div>';
            }
        })
        .catch(() => {
            document.getElementById('data-container').innerHTML = 
                '<div class="no-comments">Нет соединения</div>';
        });
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    const resizeHandler = () => {
        if (state.commentsWrapper) {
            state.contentWidth = state.commentsWrapper.scrollWidth / 2;
        }
    };
    
    window.addEventListener('resize', resizeHandler);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(state.scrollAnimationFrame);
            clearInterval(state.duplicationInterval);
        } else {
            initScroll();
        }
    });
});
