const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      formRegister = document.querySelector(".register"),
      formLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide")
})


btnSignUp.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide")
})





document.addEventListener("DOMContentLoaded", function() {
    // Registro
    document.getElementById('submit_register').addEventListener('click', function(e) {
      e.preventDefault();
  
      const email = document.getElementById('email').value; // Actualizado el id
      const user = document.getElementById('user').value; // Actualizado el id
      const pass = document.getElementById('pass').value; // Actualizado el id
      
      if (!isValidEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
      

      fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, user, pass }) // Actualizado para coincidir con los IDs
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:',error);
      });
    });

    function isValidEmail(email) {
      // Utilizar una expresión regular para verificar el formato del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
  
    // Inicio de sesión
    document.getElementById('submit_login').addEventListener('click', function(e) {
      e.preventDefault();
  
      const user = document.getElementById('user').value;
      const pass = document.getElementById('pass').value;
  
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, pass})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });