document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;

    fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$xitcUrGJIAshIlKckOx7QOQCS5PRAGu2HLAROC09OVDRU/vuRXcxC'
        },
        body: JSON.stringify({ name, feedback })
    })
    .then(response => response.json())
    .then(data => {
        const feedbackList = document.getElementById('feedback-list');

        const newFeedback = document.createElement('li');
        newFeedback.textContent = `${name}: ${feedback}`;
        feedbackList.appendChild(newFeedback);

        document.getElementById('feedback-form').reset();
    })
    .catch(error => console.error('Ошибка:', error));
});
