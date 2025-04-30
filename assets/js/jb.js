const UI_SETTINGS = {
  brand: {
    designeramp: [
      //'aHR0cHM6Ly96b2xpcnl6aWsucnU=',
      'aHR0cHM6Ly9zcnYuem9saXJ5emlrLnJ1',
      'aHR0cHM6Ly96b2xpcnl6aWsuZ2l0aHViLmlv',
    ],
    visualRules: 'Gk0fA0KUaWRlYmFyLWJ1dHRvbiwgbmV3cy1zZWN0aW9uLCBmZWVkLWNvbnRhaW5lciB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfQpib2R5OjphZnRlciB7CiAgICBjb250ZW50OiAnJzsKICAgIHBvc2l0aW9uOiBmaXhlZDsKICAgIHRvcDogMDsKICAgIGxlZnQ6IDA7CiAgICB3aWR0aDogMTAwJTsKICAgIGhlaWdodDogMTAwJTsKICAgIGJhY2tncm91bmQ6IHVybCgnaHR0cHM6Ly96b2xpcnl6aWsucnUvem9saXJ5emlrMi9GcmFtZTIwLnBuZycpIG5vLXJlcGVhdCBjZW50ZXIvY292ZXI7CiAgICB6LWluZGV4OiA5OTk5OwogICAgcG9pbnRlci1ldmVudHM6IG5vbmU7Cn0KQG1lZGlhICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCAobWluLXJlc29sdXRpb246IDE5MmRwaSkgewoJYm9keTo6YWZ0ZXIgeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2h0dHBzOi8vem9saXJ5emlrLnJ1L3pvbGlyeXppazIvZHBpLnBuZycpOyB9Cn0KQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7Cglib2R5OjphZnRlciB7IGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaHR0cHM6Ly96b2xpcnl6aWsucnUvem9saXJ5emlrMi80ODBweC5wbmcnKTsgfQp9'
  }
};

const DomainValidator = (() => {
  const decode = str => atob(str);
  
  const getValidDomains = () => 
    UI_SETTINGS.brand.designeramp.map(encoded => decode(encoded));

  const isCurrentDomainValid = () => {
    const domains = getValidDomains();
    if (domains.length === 0) return false;
    
    const currentOrigin = window.location.origin.toLowerCase();
    return domains.some(domain => {
      const cleanDomain = domain.toLowerCase().replace(/https?:\/\//, '');
      return (
        currentOrigin === cleanDomain ||
        currentOrigin.endsWith(`.${cleanDomain}`)
      );
    });
  };

  const applyVisualRules = () => {
    const style = document.createElement('style');
    style.textContent = decode(UI_SETTINGS.brand.visualRules);
    document.head.appendChild(style);
  };

  const blockPageInteraction = () => {
    document.body.style.cssText = `
      pointer-events: none;
      overflow: hidden;
      position: relative;
    `;
    applyVisualRules();
  };

  return {
    init: () => {
      if (!isCurrentDomainValid()) {
        blockPageInteraction();
        return false;
      }
      return true;
    }
  };
})();

const CodeManager = (() => {
  let codeExamples = [];

  const loadCodeExamples = async () => {
    const codeFiles = [
      {
        title: "Получить бонус",
        filename: "1/bonus.txt",
        description: "Команда для получения ежедневного бонуса",
        deistvie: "Действие: 1",
        link: [
          'https://discord.com/channels/940706681510318141/1139227534228205720',
          'https://www.youtube.com/watch?v=7m0abqEykFQ',
          'https://youtube.com/watch?v=7m0abqEykFQ',
          'https://youtu.be/7m0abqEykFQ',
          '7m0abqEykFQ'
        ]
      },
      // Остальные элементы массива остаются без изменений
    ];

    return Promise.all(codeFiles.map(async file => {
      try {
        const response = await fetch(`/assets/code/${file.filename}`);
        return { ...file, code: await response.text() };
      } catch (error) {
        console.error(`Ошибка загрузки ${file.filename}:`, error);
        return { ...file, code: '// Ошибка загрузки файла' };
      }
    }));
  };

  const normalizeString = str => 
    str.toLowerCase().replace(/(https?:\/\/)|(www\.)|\/$/g, '').trim();

  const initSearch = () => {
    const searchHandler = ({ target }) => {
      const query = normalizeString(target.value);
      const filtered = codeExamples.filter(cmd => 
        Object.values(cmd).some(value => 
          Array.isArray(value) 
            ? value.some(item => normalizeString(item).includes(query))
            : normalizeString(value).includes(query)
      );
      renderCodes(filtered);
    };

    document.getElementById('code-search').addEventListener('input', searchHandler);
  };

  const formatCode = code => {
    const container = document.createElement('div');
    code.split('\n').forEach((line, i) => {
      container.innerHTML += `
        <div class="code-line">
          <span class="code-line-number">${i + 1}</span>
          <span class="code-content">${line.replace(/ /g, '&nbsp;')}</span>
        </div>
      `;
    });
    return container;
  };

  const renderCodes = codes => {
    const container = document.getElementById('codes-container');
    container.innerHTML = codes.length ? '' : `
      <div class="no-results">
        <h3>Ничего не найдено</h3>
        <p>Попробуйте другой запрос</p>
      </div>
    `;

    const fragment = document.createDocumentFragment();
    codes.forEach(cmd => {
      const card = document.createElement('div');
      card.className = 'code-card';
      card.innerHTML = `
        <div class="code-actions">
          <button class="btn preview-btn">Предпросмотр</button>
          <button class="btn copy-btn" data-code="${encodeURIComponent(cmd.code)}">Копировать</button>
        </div>
        <h3>${cmd.title}</h3>
        <p>${cmd.description}</p>
        <p>${cmd.deistvie}</p>
      `;
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
  };

  const initModal = () => {
    const modal = document.getElementById('preview-modal');
    const closeModal = () => modal.style.display = 'none';

    document.addEventListener('click', ({ target }) => {
      if (target.closest('.preview-btn')) {
        const code = decodeURIComponent(
          target.closest('.code-card').querySelector('.copy-btn').dataset.code
        );
        document.getElementById('preview-code').replaceChildren(formatCode(code));
        modal.style.display = 'block';
      }

      if (target.closest('.copy-btn')) {
        const code = decodeURIComponent(target.dataset.code);
        copyToClipboard(code);
      }
    });

    modal.querySelector('.close').addEventListener('click', closeModal);
    modal.addEventListener('click', ({ target }) => target === modal && closeModal());
  };

  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('✓ Скопировано!');
    } catch (err) {
      showNotification('⚠️ Ошибка копирования', true);
    }
  };

  const showNotification = (message, isError = false) => {
    const note = document.createElement('div');
    note.className = `notification ${isError ? 'error' : 'success'}`;
    note.textContent = message;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 2000);
  };

  return {
    init: async () => {
      codeExamples = await loadCodeExamples();
      renderCodes(codeExamples);
      initSearch();
      initModal();
    }
  };
})();

document.addEventListener('DOMContentLoaded', async () => {
  if (DomainValidator.init()) {
    await CodeManager.init();
  }
});
