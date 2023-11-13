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
      const rol = document.getElementById('role-selector').value;
      if (!isValidEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
      

      fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, user, pass, rol }) // Actualizado para coincidir con los IDs
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if(data.success){
          window.location.href = '/login';
        } else{
          console.error('Error en el registro:', data.error);
          alert('Error en el registro. Verifica tus datos.');
        }
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
}); 
// Inicio de sesión
document.getElementById('submit_login').addEventListener('click', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email-login').value;
  const pass = document.getElementById('pass-login').value;

  const response = await fetch('http://localhost:3003/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, pass })
  });

  const data = await response.json();

  if (data.success) {
    
      document.cookie = `usuario=${encodeURIComponent(data.user.email)}; path=/`;
      document.cookie = `rol=${encodeURIComponent(data.user.rol)}; path=/`;
      // Inicio de sesión exitoso, redirige a la página deseada
      console.log('', data.user);
      // Puedes redirigir a otra página usando window.location.href o realizar otras acciones
      window.location.href = '/';
  } else {
      // Muestra un mensaje de error
      console.error('Error en el inicio de sesión:', data.error);
      alert('Error en el inicio de sesión. Verifica tus credenciales.');
  }

});