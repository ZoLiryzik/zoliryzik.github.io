document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const feedback = document.getElementById('feedback').value;

  const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, feedback }),
  });
  
  const result = await response.json();
  document.getElementById('response').innerText = result.message;
});
