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


