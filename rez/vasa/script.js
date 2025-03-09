async function sendToDiscord() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    const response = await fetch('https://api.github.com/repos/{owner}/{repo}/actions/secrets/DISCORD_WEBHOOK_URL', {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    });

    const secret = await response.json();
    const webhookURL = secret.value;

    const payload = {
        username: username,
        content: message
    };

    const webhookResponse = await fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (webhookResponse.ok) {
        alert('Сообщение отправлено успешно!');
    } else {
        alert('Ошибка при отправке сообщения.');
    }
}
