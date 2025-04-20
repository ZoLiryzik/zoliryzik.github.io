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
            if (!codeResponse.ok) throw new Error('File not found');
            const code = await codeResponse.text();
            
            codeExamples.push({
              title: file.title,
              code: code,
              description: file.description,
              deistvie: file.deistvie,
              link: file.link,
              filename: file.filename // Сохраняем имя файла
            });
          } catch (err) {
            console.error(`Ошибка загрузки файла ${file.filename}:`, err);
            // Добавляем заглушку если файл не загрузился
            codeExamples.push({
              title: file.title,
              code: `// Файл ${file.filename} не найден\n// Проверьте путь к файлу`,
              description: file.description,
              deistvie: file.deistvie,
              link: file.link,
              filename: file.filename
            });
          }
        }
        
        return codeExamples;
      }
  
      // Форматирование кода с нумерацией строк
      function formatCodeWithLineNumbers(code) {
        const lines = code.split('\n');
        const container = document.createElement('div');
        
        lines.forEach((line, index) => {
          const lineDiv = document.createElement('div');
          lineDiv.className = 'code-line';
          
          const lineNumber = document.createElement('span');
          lineNumber.className = 'code-line-number';
          lineNumber.textContent = index + 1;
          
          const lineContent = document.createElement('span');
          lineContent.className = 'code-content';
          // Сохраняем пробелы, заменяя их на неразрывные
          lineContent.innerHTML = line.replace(/ /g, '&nbsp;');
          
          lineDiv.appendChild(lineNumber);
          lineDiv.appendChild(lineContent);
          container.appendChild(lineDiv);
        });
        
        return container;
      }
  
      // Инициализация при загрузке страницы
      document.addEventListener('DOMContentLoaded', async () => {
        const codeExamples = await loadCodeExamples();
        renderCodes(codeExamples);
        initSearch(codeExamples);
        initModal();
      });
  
      // Рендер списка команд (остается без изменений)
      function renderCodes(codes) {
        const container = document.getElementById('codes-container');
        container.innerHTML = '';
  
        if (codes.length === 0) {
          const emptyMsg = document.createElement('div');
          emptyMsg.className = 'no-results';
          emptyMsg.innerHTML = `
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить поисковый запрос</p>
          `;
          container.appendChild(emptyMsg);
          return;
        }
  
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
            <!--<p class="file-info">Файл: ${cmd.filename}</p>-->
          `;
          container.appendChild(card);
        });
      }
  
      // Инициализация поиска (остается без изменений)
      function initSearch(codeExamples) {
        const search = document.getElementById('code-search');
        search.addEventListener('input', (e) => {
          const query = e.target.value.toLowerCase().trim();
          const filtered = codeExamples.filter(cmd => {
            const searchString = [
              cmd.title,
              cmd.description,
              cmd.code,
              cmd.deistvie,
              cmd.filename,
              Array.isArray(cmd.link) ? cmd.link.join(' ') : cmd.link
            ].join(' ').toLowerCase();
            return searchString.includes(query);
          });
          renderCodes(filtered);
        });
      }
  
      // Инициализация модального окна (остается без изменений)
      function initModal() {
        const modal = document.getElementById('preview-modal');
        const closeBtn = modal.querySelector('.close');
  
        document.addEventListener('click', (e) => {
          // Предпросмотр
          if (e.target.classList.contains('preview-btn')) {
            const title = e.target.dataset.id;
            const container = document.getElementById('preview-code');
            container.innerHTML = '';
            
            // Находим команду по заголовку
            const allCards = document.querySelectorAll('.code-card');
            let foundCode = null;
            
            allCards.forEach(card => {
              if (card.querySelector('h3').textContent === title) {
                const code = decodeURIComponent(card.querySelector('.copy-btn').dataset.code);
                foundCode = code;
              }
            });
            
            if (foundCode) {
              const formattedCode = formatCodeWithLineNumbers(foundCode);
              container.appendChild(formattedCode);
              modal.style.display = 'block';
            }
          }
  
          // Копирование
          if (e.target.classList.contains('copy-btn')) {
            const code = decodeURIComponent(e.target.dataset.code);
            copyToClipboard(code);
          }
        });
  
        // Закрытие модалки
        closeBtn.onclick = () => modal.style.display = 'none';
        window.onclick = (e) => e.target === modal && (modal.style.display = 'none');
      }
  
      // Вспомогательные функции (остаются без изменений)
      function sanitizeFileName(name) {
        return name
          .replace(/[^а-яА-ЯёЁa-zA-Z0-9\s_-]/g, '')
          .replace(/\s+/g, '_')
          .substring(0, 50);
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
        note.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 12px 24px;
          border-radius: 8px;
          background: ${isError ? '#ed4245' : '#43b581'};
          color: white;
          font-weight: 500;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          z-index: 1000;
        `;
        note.textContent = text;
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 2000);
      }