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
      const pass = document.getElementById('pass').value;
      const rut = document.getElementById('rutRegister').value; 
      const edad = document.getElementById('edadRegister').value;  // Actualizado el id
      const rol = 'usuario';
      if (!isValidEmail(email)) {
        //alert('Por favor, ingresa una dirección de correo electrónico válida.');
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Por favor, ingresa una dirección de correo electrónico válida.",
          showConfirmButton: true,
          confirmButtonColor: "#5cb85c",
          confirmButtonText: "Aceptar",
          clickOutsideToClose: false
        });
        return;
    }
      

      fetch('http://localhost:3003/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, user, rol , pass, rut, edad}) // Actualizado para coincidir con los IDs
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if(data.success){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Registro exitoso! El usuario ha sido registrado correctamente.",
            showConfirmButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.assign('/register');
            }
          });
          //window.location.href = '/register';
        } else{
          console.error('Error en el registro:', data.error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error en el registro. El usuario ya existe o es invalido.",
            showConfirmButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Aceptar",
            clickOutsideToClose: false
          });
          //alert('Error en el registro. Verifica tus datos.');
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
      document.cookie = `emailusuario=${encodeURIComponent(data.user.email)}; path=/`;
      document.cookie = `usuario=${encodeURIComponent(data.user.user)}; path=/`;
      document.cookie = `rol=${encodeURIComponent(data.user.rol)}; path=/`;    
      console.log('Usuario logueado:', data.user);
      
      
      // Verifica el rol del usuario y redirige a la página correspondiente
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Has iniciado sesión correctamente",
        showConfirmButton: true,
        confirmButtonColor: "#5cb85c",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          if (data.user.rol === 'admin') {
            window.location.assign('http://localhost:3003/indexadmin'); // Corregido
            
        } else if (data.user.rol === 'usuario') {
          window.location.assign('http://localhost:3003/'); // Corregido
        } else {
            // Redirige a una página de error o muestra un mensaje si el rol no es reconocido
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Rol no autorizado. Contacta al administrador.",
              showConfirmButton: true,
              confirmButtonColor: "#5cb85c",
              confirmButtonText: "Aceptar",
              clickOutsideToClose: false
            });
            //alert('Rol no autorizado. Contacta al administrador.');
        }
        }
      });
  } else {
      console.error('Error en el inicio de sesión:', data.error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en el inicio de sesión. Verifica tus credenciales.",
        showConfirmButton: true,
        confirmButtonColor: "#5cb85c",
        confirmButtonText: "Aceptar",
        clickOutsideToClose: false
      });
      //alert('Error en el inicio de sesión. Verifica tus credenciales.');
  }
});
