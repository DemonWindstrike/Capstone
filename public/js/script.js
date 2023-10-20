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