document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    fetch('feedback.json')
        .then(response => response.json())
        .then(data => {
            data.push({ name, message });
            fetch('feedback.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            displayFeedbacks();
        });
});

function displayFeedbacks() {
    fetch('feedback.json')
        .then(response => response.json())
        .then(data => {
            const feedbackContainer = document.getElementById('feedbacks');
            feedbackContainer.innerHTML = '';
            data.forEach(feedback => {
                const feedbackElement = document.createElement('div');
                feedbackElement.innerHTML = `<strong>${feedback.name}</strong>: ${feedback.message}`;
                feedbackContainer.appendChild(feedbackElement);
            });
        });
}

displayFeedbacks();
