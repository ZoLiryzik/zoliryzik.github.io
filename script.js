document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    const data = {
        name: name,
        email: email
    };
    
    // Сохранение данных в JSON-файл
    const jsonData = JSON.stringify(data);
    download(jsonData, 'data.json', 'application/json');
});

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
