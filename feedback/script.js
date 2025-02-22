document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({ name, message });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    displayFeedbacks();
});

function displayFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const feedbackContainer = document.getElementById('feedbacks');
    feedbackContainer.innerHTML = '';
    feedbacks.forEach(feedback => {
        const feedbackElement = document.createElement('div');
        feedbackElement.innerHTML = `<strong>${feedback.name}</strong>: ${feedback.message}`;
        feedbackContainer.appendChild(feedbackElement);
    });
}

displayFeedbacks();
