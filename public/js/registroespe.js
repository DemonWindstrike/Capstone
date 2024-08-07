// registroespe.js
const nPaciente = getCookieValue("usuario");
const imgNombre = document.getElementById("imgIconoNombre")
const imgLogin = document.getElementById("imgIconoLogin")

// Obtener el elemento <span> por su ID
const txtLogin = document.getElementById("txtLogin");
const txtNombre = document.getElementById("txtNombre"); 
const btnRegisterEspecialista = document.getElementById("btnRegisterEspecialista");
const logoutButton = document.getElementById('logoutButton');

// Cambiar el texto del <span> utilizando textContent
if (nPaciente != null) {
  txtLogin.classList.add("d-none");
  txtNombre.classList.remove("d-none");
  imgLogin.classList.add("d-none")
  imgNombre.classList.remove("d-none")
  logoutButton.classList.remove("d-none")
  txtNombre.textContent = nPaciente;
}else{
  txtLogin.classList.remove("d-none");
  txtNombre.classList.add("d-none");
  imgLogin.classList.remove("d-none")
  imgNombre.classList.add("d-none")
  logoutButton.classList.add("d-none");
}

logoutButton.addEventListener('click', function(event) {
  event.preventDefault();
  
  // Elimina las cookies estableciendo su valor a una cadena vacía y una fecha de vencimiento en el pasado
  document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Redirecciona a la página de inicio de sesión o a donde desees después de cerrar sesión
  window.location.href = "/"; // Cambia esta URL según tus necesidades
});


document.getElementById('rut_especialista').addEventListener('input', function(e) {
  let valor = e.target.value;

  // Permitir solo números y la letra K o k
  valor = valor.replace(/[^0-9kK]+/g, '');

  // Limitar la longitud a 10 caracteres
  valor = valor.slice(0, 9);

  // Eliminar puntos y guiones previos
  valor = valor.replace(/\./g, '').replace('-', '');

  // Separar dígito verificador del resto del RUT
  let rut = valor.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  let dv = valor.slice(-1).toUpperCase(); // Convertir K a mayúsculas

  e.target.value = rut + (rut ? '-' : '') + dv;
});


document.getElementById('registrarEspecialista').addEventListener('submit', function(event){
  event.preventDefault();
  //referencia form
  const form = document.getElementById('registrarEspecialista');
  // Recopilar los valores de los campos del formulario
  var nombre_especialista = document.getElementById('nombre_especialista').value;
  var rut_especialista = document.getElementById('rut_especialista').value.replace(/\./g, '').replace('-', '');
  var telefono = document.getElementById('telefono').value;
  var correo_electronico = document.getElementById('correo_electronico').value;
  var descripcion = document.getElementById('descripcion').value;
  var costo_consulta = document.getElementById('costo_consulta').value;
  var especialidad = document.getElementById('especialidad').value;
  var experiencia = document.getElementById('experiencia').value;
  var centro_medico = document.getElementById('centro_medico').value;
  var universidad = document.getElementById('universidad').value;
  var tipoCentro = document.getElementById('tipoCentro').value;
  var nivelAtencion = document.getElementById('nivelAtencion').value;

  // Crear un objeto con los datos del formulario
  var formData = {
      nombre_especialista: nombre_especialista,
      rut_especialista: rut_especialista,
      telefono: telefono,
      correo_electronico: correo_electronico,
      descripcion: descripcion,
      costo_consulta: costo_consulta,
      especialidad: especialidad,
      experiencia: experiencia,
      centro_medico: centro_medico,
      universidad: universidad,
      tipoCentroMedico: tipoCentro,
      nivelAtencion: nivelAtencion
  };

  // Realizar la petición fetch al servidor
  fetch('http://localhost:303/api/registrarEspecialista', { // Asegúrate de que la URL sea correcta
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // Convertir los datos del formulario a un string JSON
  })
  .then(response => {
    if (response.status === 409) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Error de registro! El especialista ya ha sido registrado previamente.",
        showConfirmButton: true,
        confirmButtonColor: "#5cb85c",
        confirmButtonText: "Aceptar",
        clickOutsideToClose: false
      });
        throw new Error('No se pudo registrar el especialista. El especialista ya existe.');
    }
    return response.json();
  })
  .then(data => {
      console.log('Respuesta del servidor:', data);
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "¡Registro exitoso! El especialista ha sido registrado correctamente.",
          showConfirmButton: true,
          confirmButtonColor: "#5cb85c",
          confirmButtonText: "Aceptar",
        });
          // Redirigir al usuario o mostrar mensaje de éxito
      } else {
          // Mostrar mensaje de error
          Swal.fire({
            position: "center",
            icon: "error",
            title: `Error al registrar especialista ${data.message}`,
            showConfirmButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Aceptar"
          });
          
      }
  })
  .catch(error => {
      console.error('Error durante el registro:', error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error al registrar especialista: ${error.message}`,
        showConfirmButton: true,
        confirmButtonColor: "#5cb85c",
        confirmButtonText: "Aceptar"
      });
      //vaciar inputs del form cuando la respuesta es negativa
    //   Array.from(form.elements).forEach(input => {
    //     if (input.type !== 'submit') { // Evitar el botón de envío
    //         input.value = '';
    //     }
    // });
  });
});
