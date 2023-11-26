// registroespe.js
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
      universidad: universidad
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
      if (data.success) {
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
