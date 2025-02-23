document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const feedback = document.getElementById('feedback').value;

  const response = await fetch('https://script.google.com/macros/s/AKfycbw6EN4qykf1jc2WjWN30ub2KG7KF47n_TMXrl6eLKyJkIBr_btvtj04-grvLajYnVlQCw/exec', {
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
