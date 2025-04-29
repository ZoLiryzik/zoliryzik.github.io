$(document).ready(function() {
    // Открытие/закрытие формы
    $('#sidebarBtn').click(function(e) {
        e.stopPropagation();
        $('#formContainer').toggleClass('active');
    });

    // Закрытие формы при клике вне её области
    $(document).click(function(e) {
        if (!$(e.target).closest('#formContainer').length && 
            !$(e.target).is('#sidebarBtn')) {
            $('#formContainer').removeClass('active');
        }
    });

    
  // Проверяем, совпадает ли текущий домен с оригиналом
  const originalDomain = "https://ваш_домен.ru"; // Замените на ваш домен, например: "https://сайт.ru"

  if (window.location.origin !== originalDomain) {
    // Показываем предупреждение только если домен не оригинальный
    document.body.innerHTML += `
      <div style="position: fixed; top: 0; background: red; color: white; padding: 10px; width: 100%; text-align: center; z-index: 9999;">
        ⚠️ Это копия! Оригинальный сайт: <a href="${originalDomain}" style="color: white; text-decoration: underline;">${originalDomain}</a>
      </div>
    `;
  }

    
    // Обработка отправки формы
    $('#bootstrapForm').submit(function(event) {
        event.preventDefault();
        
        // Проверка валидности формы
        if (!this.checkValidity()) {
            alert("Пожалуйста, заполните все обязательные поля правильно!");
            return;
        }

        // Отправка данных
        $(this).ajaxSubmit({
            dataType: 'jsonp',
            error: function() {
                alert('Спасибо за ваш отзыв! Форма отправлена.');
                $('#formContainer').removeClass('active');
                $('#bootstrapForm')[0].reset();
            }
        });
    });
});
