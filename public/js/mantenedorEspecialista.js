//mantenedorEspecialista.js
const nPaciente = getCookieValue("usuario");
const imgNombre = document.getElementById("imgIconoNombre")
const imgLogin = document.getElementById("imgIconoLogin")

// Obtener el elemento <span> por su ID
const txtLogin = document.getElementById("txtLogin");
const txtNombre = document.getElementById("txtNombre"); 
const btnRegisterEspecialista = document.getElementById("btnRegisterEspecialista");


// Cambiar el texto del <span> utilizando textContent
if (nPaciente != null) {
  txtLogin.classList.add("d-none");
  txtNombre.classList.remove("d-none");
  imgLogin.classList.add("d-none")
  imgNombre.classList.remove("d-none")
  txtNombre.textContent = nPaciente;
}else{
  txtLogin.classList.remove("d-none");
  txtNombre.classList.add("d-none");
  imgLogin.classList.remove("d-none")
  imgNombre.classList.add("d-none")
}


document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:303/api/especialistas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(especialistas => {
        const lista = document.getElementById('listaEspecialistas');
        const tabla = document.createElement('table');
        tabla.className = 'table table-striped'; // Agrega tus clases de estilo aquí, si estás usando Bootstrap u otro framework
  
        // Agregar cabecera de la tabla
        const thead = tabla.createTHead();
        const rowHead = thead.insertRow();
        const headers = ['Nombre', 'RUT', 'Centro Médico', 'Acciones'];
        headers.forEach(headerText => {
          const header = document.createElement('th');
          header.textContent = headerText;
          rowHead.appendChild(header);
        });
  
        // Agregar cuerpo de la tabla
        const tbody = tabla.createTBody();
  
        especialistas.forEach(especialista => {
          const row = tbody.insertRow();
          
          // Añadir la información del especialista en cada celda
          row.insertCell().textContent = especialista.nombre_especialista;
          row.insertCell().textContent = especialista.rut_especialista;
          row.insertCell().textContent = especialista.centro_medico;
          
          // Celda para el botón de eliminar
          const deleteCell = row.insertCell();
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.className = 'btn btn-danger btn-eliminar'; // Agrega tus clases de botón aquí
          deleteButton.setAttribute('data-id', especialista.id_especialista);
          deleteButton.addEventListener('click', function() {
            event.preventDefault();
            eliminarEspecialista(especialista.rut_especialista, row);
          });
          deleteCell.appendChild(deleteButton);
        });
  
        // Añadir la tabla al div
        lista.innerHTML = ''; // Limpiar el contenido anterior
        lista.appendChild(tabla);
      })
      .catch(error => {
        console.error('Error al obtener los especialistas:', error);
      });
  });
  
  function eliminarEspecialista(rut, row) {
    // Obtener el rol desde las cookies
    const rol = getCookieValue('rol');

    // Verificar si el rol es 'admin'
    if (rol === 'admin') {
        // Si es admin, ejecutar la solicitud fetch para eliminar
        fetch(`http://localhost:303/api/deleteEspecialista/${rut}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Problema al eliminar el especialista');
            }
            return response.json();
        })
        .then(data => {
            console.log('Especialista eliminado:', data);
            row.remove(); // Eliminar la fila de la tabla
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Especialista con RUT ${rut} eliminado con éxito`,
                showConfirmButton: true,
                confirmButtonColor: "#5cb85c",
                confirmButtonText: "Aceptar",
              });
            //alert(`Especialista con RUT ${rut} eliminado con éxito`);
        })
        .catch(error => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al eliminar el especialista: " + error,
                showConfirmButton: true,
                confirmButtonColor: "#5cb85c",
                confirmButtonText: "Aceptar",
                clickOutsideToClose: false
              });
        });
    } else {
        // Si no es admin, mostrar una alerta
        Swal.fire({
            position: "center",
            icon: "error",
            title: "No tienes permisos para realizar esta acción",
            showConfirmButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Aceptar",
            clickOutsideToClose: false
          });
    }
}
  