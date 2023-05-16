const form = document.querySelector('form');
const respuesta = document.querySelector('#respuesta');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  fetch('/publica', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    respuesta.textContent = data;
  })
  .catch(error => {
    console.error('Error:', error);
  });
});



