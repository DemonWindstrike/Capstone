//mantenedorEspecialista.js
const nPaciente = getCookieValue("usuario");
const imgNombre = document.getElementById("imgIconoNombre")
const imgLogin = document.getElementById("imgIconoLogin")
console.log(document.getElementById('formEditarEspecialista'));
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
        tabla.className = 'table table-striped';

        const thead = tabla.createTHead();
        const rowHead = thead.insertRow();
        const headers = ['Nombre', 'RUT', 'Centro Médico', 'Acciones'];
        headers.forEach(headerText => {
          const header = document.createElement('th');
          header.textContent = headerText;
          rowHead.appendChild(header);
        });

        const tbody = tabla.createTBody();

        especialistas.forEach(especialista => {
          const row = tbody.insertRow();
          
          row.insertCell().textContent = especialista.nombre_especialista;
          row.insertCell().textContent = especialista.rut_especialista;
          row.insertCell().textContent = especialista.centro_medico;

          const actionCell = row.insertCell();

          // Botón de editar
          const editButton = document.createElement('button');
          editButton.textContent = 'Editar';
          editButton.className = 'btn btn-primary btn-editar';
          editButton.setAttribute('data-id', especialista.id_especialista);
          editButton.addEventListener('click', function() {
            event.preventDefault();
            abrirModalEdicion(especialista);
          });
          actionCell.appendChild(editButton);

          // Botón de eliminar
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.className = 'btn btn-danger btn-eliminar';
          deleteButton.setAttribute('data-id', especialista.id_especialista);
          deleteButton.addEventListener('click', function(event) {
            event.preventDefault();
            eliminarEspecialista(especialista.rut_especialista, row);
          });
          actionCell.appendChild(deleteButton);
        });

        lista.innerHTML = '';
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


// Función para abrir el modal de edición con los datos del especialista cargados
function abrirModalEdicion(especialista) {
    // Cargar los datos en el formulario
    document.getElementById('editIdEspecialista').value = especialista.id_especialista;
    document.getElementById('editNombreEspecialista').value = especialista.nombre_especialista;
    document.getElementById('editRutEspecialista').value = especialista.rut_especialista;
    document.getElementById('editTelefono').value = especialista.telefono;
    document.getElementById('editCorreo').value = especialista.correo_electronico;
    document.getElementById('editDescripcion').value = especialista.descripcion;
    document.getElementById('editCostoConsulta').value = especialista.costo_consulta;
    document.getElementById('editEspecialidad').value = especialista.especialidad;
    document.getElementById('editExperiencia').value = especialista.experiencia;
    document.getElementById('editCentroMedico').value = especialista.centro_medico;
    document.getElementById('editUniversidad').value = especialista.universidad;
    document.getElementById('editTipoCentroMedico').value = especialista.tipoCentroMedico;
    document.getElementById('editNivelAtencion').value = especialista.nivelAtencion;
  
    // Mostrar el modal
    document.getElementById('modalEditarEspecialista').style.display = 'block';
  }
  
  // Función para cerrar el modal de edición
  function cerrarModalEdicion() {
    document.getElementById('modalEditarEspecialista').style.display = 'none';
  }
  
  // Evento para cerrar el modal cuando se hace clic en la "x"
  document.querySelector('.close').addEventListener('click', cerrarModalEdicion);
  
  // Manejar el envío del formulario de edición
 
  const btnActualizarEspecialista = document.getElementById('btnActualizarEspecialista');

  btnActualizarEspecialista.addEventListener('click', function(event) {
        event.preventDefault();
        const id = document.getElementById('editIdEspecialista').value;
        const rut = document.getElementById('editRutEspecialista').value;
        const nombreEspecialista = document.getElementById('editNombreEspecialista').value;
        const telefono = document.getElementById('editTelefono').value;
        const correo = document.getElementById('editCorreo').value;
        const descripcion =  document.getElementById('editDescripcion').value;
        const costoConsulta = document.getElementById('editCostoConsulta').value;
        const especialidad = document.getElementById('editEspecialidad').value;
        const experiencia = document.getElementById('editExperiencia').value;
        const centroMedico = document.getElementById('editCentroMedico').value;
        const universidad = document.getElementById('editUniversidad').value;
        const tipoCentroMedico = document.getElementById('editTipoCentroMedico').value;
        const nivelAtencion = document.getElementById('editNivelAtencion').value;
      
        // Construye el objeto con los datos actualizados
        const especialistaActualizado = {
            nombre_especialista: nombreEspecialista,
            rut_especialista: rut,
            telefono: telefono,
            correo_electronico: correo,
            descripcion: descripcion,
            costo_consulta: costoConsulta,
            especialidad: especialidad,
            experiencia: experiencia,
            centro_medico: centroMedico,
            universidad: universidad,
            tipoCentroMedico: tipoCentroMedico,
            nivelAtencion: nivelAtencion
          };
          
      
        // Realiza la solicitud fetch para actualizar los datos del especialista
        fetch(`http://localhost:303/api/updateEspecialista/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(especialistaActualizado)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Problema al actualizar el especialista');
          }
          return response.json();
        })
        .then(data => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Especialista actualizado con éxito, la pagina se actualizara.`,
                showConfirmButton: true,
                confirmButtonColor: "#5cb85c",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
              });//window.location.reload();
          //alert('Especialista actualizado con éxito');
          cerrarModalEdicion();
          // Aquí podrías actualizar la vista o la tabla para reflejar los cambios
        })
        .catch(error => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Hubo un error al actualizar el especialista",
                showConfirmButton: true,
                confirmButtonColor: "#5cb85c",
                confirmButtonText: "Aceptar",
                clickOutsideToClose: false
              });
          alert('Hubo un error al actualizar el especialista');
          console.error('Error al actualizar el especialista:', error);
        });
      });

  