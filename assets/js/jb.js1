// Загрузка команд из указанных файлов
async function loadCodeExamples() {
  // Прямое указание файлов с кодом
  const codeFiles = [
    {
      title: "Получить бонус",
      filename: "1/bonus.txt",
      description: "Команда для получения ежедневного бонуса",
      deistvie: "Действие: 1",
      link: ['https://discord.com/channels/940706681510318141/1139227534228205720', 'https://www.youtube.com/watch?v=7m0abqEykFQ', 'https://youtube.com/watch?v=7m0abqEykFQ', 'https://youtu.be/7m0abqEykFQ', '7m0abqEykFQ' ]
    },
    {
      title: "Просмотр баланса участника и свой",
      filename: "1/balance.txt", 
      description: "Команда для проверки баланса",
      deistvie: "Действие: 1",
      link: ['https://discord.com/channels/940706681510318141/1139227534228205720', 'https://www.youtube.com/watch?v=7m0abqEykFQ', 'https://youtube.com/watch?v=7m0abqEykFQ', 'https://youtu.be/7m0abqEykFQ', '7m0abqEykFQ' ]
    },
    {
      title: "Устроится шахтёром",
      filename: "2/устроится_шахтёром.txt",
      description: "Устроится шахтёром",
      deistvie: "Действие: 2",
      link: ['https://discord.com/channels/940706681510318141/1139227933559505027', 'https://www.youtube.com/watch?v=8kNKljzhnIQ', 'https://youtube.com/watch?v=8kNKljzhnIQ', 'https://youtu.be/8kNKljzhnIQ', '8kNKljzhnIQ' ]
    },
    {
      title: "Работать шахтёром",
      filename: "2/работать_шахтёром.txt", 
      description: "Работать шахтёром",
      deistvie: "Действие: 2",
      link: ['https://discord.com/channels/940706681510318141/1139227933559505027', 'https://www.youtube.com/watch?v=8kNKljzhnIQ', 'https://youtube.com/watch?v=8kNKljzhnIQ', 'https://youtu.be/8kNKljzhnIQ', '8kNKljzhnIQ' ]
    },
    {
      title: "Уволиться с работы шахтёр",
      filename: "2/увалится_с_работы_шахтёр.txt", 
      description: "Уволиться с работы шахтёр",
      deistvie: "Действие: 2",
      link: ['https://discord.com/channels/940706681510318141/1139227933559505027', 'https://www.youtube.com/watch?v=8kNKljzhnIQ', 'https://youtube.com/watch?v=8kNKljzhnIQ', 'https://youtu.be/8kNKljzhnIQ', '8kNKljzhnIQ' ]
    }
    ,
    {
      title: "Положить монеты в банк",
      filename: "3/положить_монеты_в_банк.txt",
      description: "Положить монеты в банк",
      deistvie: "Действие: 3",
      link: ['https://discord.com/channels/940706681510318141/1139228394618359809', 'https://www.youtube.com/watch?v=tRVYH7RHyy8', 'https://youtube.com/watch?v=tRVYH7RHyy8', 'https://youtu.be/tRVYH7RHyy8', 'tRVYH7RHyy8' ]
    },
    {
      title: "Снять монеты из банка",
      filename: "3/снять_монеты_из_банка.txt", 
      description: "Снять монеты из банка",
      deistvie: "Действие: 3",
      link: ['https://discord.com/channels/940706681510318141/1139228394618359809', 'https://www.youtube.com/watch?v=tRVYH7RHyy8', 'https://youtube.com/watch?v=tRVYH7RHyy8', 'https://youtu.be/tRVYH7RHyy8', 'tRVYH7RHyy8' ]
    },
    {
      title: " Обновлённый баланс",
      filename: "3/обновлённый_баланс.txt", 
      description: " Обновлённый баланс",
      deistvie: "Действие: 3",
      link: ['https://discord.com/channels/940706681510318141/1139228394618359809', 'https://www.youtube.com/watch?v=tRVYH7RHyy8', 'https://youtube.com/watch?v=tRVYH7RHyy8', 'https://youtu.be/tRVYH7RHyy8', 'tRVYH7RHyy8' ]
    }
  ];
  
  // Загружаем содержимое каждого файла
  const codeExamples = [];
  for (const file of codeFiles) {
    try {
      const codeResponse = await fetch(`/assets/code/${file.filename}`);
      const code = await codeResponse.text();
      codeExamples.push({ ...file, code });
    } catch (err) {
      codeExamples.push({ ...file, code: `// Ошибка загрузки файла` });
    }
  }
  return codeExamples;
}

function normalizeLink(link) {
  return String(link)
    .toLowerCase()
    .replace(/(https?:\/\/)|(www\.)/g, '')
    .replace(/\/$/, '')
    .trim();
}

function initSearch(codeExamples) {
  const search = document.getElementById('code-search');
  search.addEventListener('input', (e) => {
    const query = normalizeLink(e.target.value.trim());
    const filtered = codeExamples.filter(cmd => {
      const normalizedQuery = normalizeLink(query);
      
      // Проверка основных полей
      const basicMatch = [
        cmd.title,
        cmd.description,
        cmd.code,
        cmd.deistvie
      ].some(field => 
        normalizeLink(field).includes(normalizedQuery)
      );
      
      // Проверка ссылок
      const linkMatch = cmd.link.some(link => 
        normalizeLink(link).includes(normalizedQuery)
      );
      
      return basicMatch || linkMatch;
    });
    
    renderCodes(filtered);
  });
}

function formatCodeWithLineNumbers(code) {
  const lines = code.split('\n');
  const container = document.createElement('div');

  lines.forEach((line, index) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'code-line';
    lineDiv.innerHTML = `
      <span class="code-line-number">${index + 1}</span>
      <span class="code-content">${line.replace(/ /g, '&nbsp;')}</span>
    `;
    container.appendChild(lineDiv);
  });
  return container;
}

function renderCodes(codes) {
  const container = document.getElementById('codes-container');
  container.innerHTML = codes.length ? '' : `
    <div class="no-results">
      <h3>Ничего не найдено</h3>
      <p>Попробуйте изменить поисковый запрос</p>
    </div>
  `;

  codes.forEach(cmd => {
    const card = document.createElement('div');
    card.className = 'code-card';
    card.innerHTML = `
      <div class="code-actions">
        <button class="btn preview-btn" data-id="${cmd.title}">Предпросмотр</button>
        <button class="btn copy-btn" data-code="${encodeURIComponent(cmd.code)}">Копировать</button>
      </div>
      <h3>${cmd.title}</h3>
      <p>${cmd.description}</p>
      <p>${cmd.deistvie}</p>
    `;
    container.appendChild(card);
  });
}

function initModal() {
  const modal = document.getElementById('preview-modal');
  const closeBtn = modal.querySelector('.close');

  document.addEventListener('click', (e) => {
    if (e.target.closest('.preview-btn')) {
      const title = e.target.dataset.id;
      const codeCard = e.target.closest('.code-card');
      const code = decodeURIComponent(
        codeCard.querySelector('.copy-btn').dataset.code
      );
      
      const container = document.getElementById('preview-code');
      container.innerHTML = '';
      container.appendChild(formatCodeWithLineNumbers(code));
      modal.style.display = 'block';
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.copy-btn')) {
      const code = decodeURIComponent(e.target.dataset.code);
      copyToClipboard(code);
    }
  });

  closeBtn.onclick = () => modal.style.display = 'none';
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification('✓ Код скопирован!');
  } catch (err) {
    showNotification('⚠ Ошибка копирования', true);
  }
}

function showNotification(text, isError = false) {
  const note = document.createElement('div');
  note.className = 'notification ' + (isError ? 'error' : 'success');
  note.textContent = text;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2000);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', async () => {
  const codeExamples = await loadCodeExamples();
  renderCodes(codeExamples);
  initSearch(codeExamples);
  initModal();
});
