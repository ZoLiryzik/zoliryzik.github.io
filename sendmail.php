<?php
if ($_POST['capcha'] !=56){
    header('location: index.php');
    exit;
}
if($_POST['subject']==1){
    $subject = 'Вопрос по вакансии';
}if($_POST['subject']==2){
    $subject = 'Хочу работать у вас!';
}if($_POST['subject']==3){
    $subject = 'Возникла проблема';
}if($_POST['subject']==4){
    $subject = 'Другое';
}else{
    $subject = 'Другое';
}
$my_mail = "diglo00@mail.ru";
$from = trim($_POST['email']);
$message = htmlspecialchars($_POST['message']);
$message = urldecode($message);
$message = trim($_POST['message']);

$headers = "From: $from" . "\r\n" . 
"Reply-To: $from" . "\r\n". 
"X-Mailer: PHP/" . phpversion();
 if(mail($my_mail, $subject, $message, $headers)){
    echo 'Письмо отправлено';
 } else{
    echo 'Письмо не удалось отправить';
 }
