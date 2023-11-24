// scripts.js
document.getElementById('registroEspecialista').addEventListener('submit', function(event){
    event.preventDefault();
    
    var centroMedico = document.getElementById('centroMedico').value;
    var correo = document.getElementById('correo').value;
    // Repite para los demás campos del formulario
    
    // Aquí puedes agregar la lógica para validar los datos o enviarlos a tu servidor Node.js
    console.log(centroMedico, correo);
    
    // Aquí podrías hacer una petición AJAX o Fetch para enviar los datos al servidor
    // fetch('/registrar-especialista', { method: 'POST', body: new FormData(this) })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));
  });
  