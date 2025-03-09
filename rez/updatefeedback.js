const fs = require('fs');

const feedbacks = JSON.parse(fs.readFileSync('feedback.json'));

// Пример добавления отзыва
feedbacks.push({ name: 'User', message: 'This is a sample feedback!' });

fs.writeFileSync('feedback.json', JSON.stringify(feedbacks, null, 2));
