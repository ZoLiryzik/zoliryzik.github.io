<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form-Mail</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <form action="sendmail.php" method="POST">
        <select name="subject">
            <option disabled selected>Веберите тему письма</option>
            <option value="1">Вопрос по вакансии</option>
            <option value="2">Хочу работать у вас!</option>
            <option value="3">Возникла проблема</option>
            <option value="4">Другое</option>
        </select>
        <input type="email" name="email" placeholder="Введите ваш email" maxlength="50" required>
        <textarea name="message" placeholder="Введите сообщение" maxlength="150" required></textarea>
        <img src="capcha/capcha1.jpg">
        <input type="number" name="capcha" placeholder="Введите ответ" maxlength="3" required>
        <input type="submit" value="Отправить письмо">
    </form>    
</body>
</html>
