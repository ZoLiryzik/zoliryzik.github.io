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

    // Обработка отправки формы
    $('#bootstrapForm').submit(function(event) {
        event.preventDefault();
        
        // Проверка валидности формы
        if (!this.checkValidity()) {
            alert("Пожалуйста, заполните все обязательные поля правильно!");
            return;
        }

        // Проверка reCAPTCHA
        if (!validateRecaptcha()) {
            alert("Пожалуйста, подтвердите что вы не робот!");
            return;
        }

        // Отправка данных
        $(this).ajaxSubmit({
            dataType: 'jsonp',
            error: function() {
                alert('Спасибо за ваш отзыв! Форма отправлена.');
                $('#formContainer').removeClass('active');
                $('#bootstrapForm')[0].reset();
                
                // Сброс reCAPTCHA после отправки
                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.reset();
                }
            }
        });
    });

    // Функция проверки reCAPTCHA
    window.validateRecaptcha = function() {
        const response = grecaptcha.getResponse();
        return response.length > 0;
    }
});
