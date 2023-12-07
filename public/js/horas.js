
var nombre = getCookieValue("usuario");
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
  logoutButton.classList.add("d-none");
  imgNombre.classList.add("d-none")
}

logoutButton.addEventListener('click', function(event) {
  event.preventDefault();
  
  // Elimina las cookies estableciendo su valor a una cadena vacía y una fecha de vencimiento en el pasado
  document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Redirecciona a la página de inicio de sesión o a donde desees después de cerrar sesión
  window.location.href = "/"; // Cambia esta URL según tus necesidades
});

document.addEventListener("DOMContentLoaded", () => {
  const currentDateElement = document.getElementById("current-date");
  const calendarElement = document.getElementById("calendar");
  const timeSlotsContainer = document.querySelector('.time-slots');
  let selectedDate = new Date();

  function generateCalendar(date) {
    
    if (calendarElement) {
      // Verifica si el elemento existe antes de modificar su innerHTML
      calendarElement.innerHTML = '';
    } // Limpiar el calendario antes de regenerar
    // Lógica para generar el calendario...
  }

  // Función para obtener las citas del especialista desde la API
  function obtenerCitas() {
    return fetch('http://localhost:303/api/citas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener las citas');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error en la solicitud de citas:', error);
      });
  }

  // Función para actualizar los horarios disponibles basándose en las citas existentes
  function actualizarHorariosDisponibles(citas, fechaSeleccionada) {
    const idEspecialista = sessionStorage.getItem('idEspecialista'); // Obtiene el ID del especialista almacenado en sessionStorage

    const horariosOcupados = citas
      .filter(cita => cita.id_especialista.toString() === idEspecialista)
      .map(cita => {
        const inicio = new Date(cita.fecha_inicio_evento);
        const termino = new Date(cita.fecha_termino_evento);
        if (inicio.toDateString() === fechaSeleccionada.toDateString()) {
          return { inicio, termino };
        }
        return null;
      })
      .filter(Boolean);

    const horariosDeTrabajo = ['12:00', '12:30', '13:00', '13:30'];
    const horariosDisponibles = horariosDeTrabajo.filter(horario => {
      const horaInicioTurno = new Date(fechaSeleccionada.toISOString().split('T')[0] + 'T' + horario + ':00');
      return !horariosOcupados.some(ocupado => horaInicioTurno >= ocupado.inicio && horaInicioTurno < ocupado.termino);
    });

    timeSlotsContainer.innerHTML = horariosDisponibles
      .map(horario => `<button class="time-slot" data-hora="${horario}">Reservar ${horario}</button>`)
      .join('');
  }

  // Función para manejar la reserva de una hora
  function reservarHora(fecha, hora) {
    console.log('Reservando hora:', fecha, hora);
    const tituloCita = getCookieValue("usuario"); // Asegúrate de que este valor se establezca en el sessionStorage
    const idEspecialista = sessionStorage.getItem('idEspecialista');
    let nameEspec = sessionStorage.getItem("especialista");
    let nameDec = atob(nameEspec); // Asegúrate de que este valor se establezca en el sessionStorage
  
    // Formatear fechas de inicio y término del evento
    const fechaInicioEvento = new Date(fecha);
    fechaInicioEvento.setHours(hora.split(':')[0], hora.split(':')[1], 0); // Establece la hora de inicio según el botón presionado
    const fechaTerminoEvento = new Date(fechaInicioEvento.getTime() + 30 * 60000); // Asume que cada cita dura 30 minutos
  
    // Preparar el cuerpo de la solicitud
    const datosCita = {
      nombrePaciente: tituloCita,
      fechaInicioEvento: fechaInicioEvento.toISOString().slice(0, 19),
      fechaTerminoEvento: fechaTerminoEvento.toISOString().slice(0, 19),
      nombreEspecialista: nameDec
    };
  
    // Enviar la solicitud fetch al nuevo endpoint
    fetch('http://localhost:303/api/registrar-cita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosCita),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Problema al registrar la cita');
      }
      return response.json();
    })
    .then(data => {
      alert('Cita registrada con éxito');
      window.location.assign('http://localhost:3003/');
      // Aquí podrías actualizar la UI o el calendario para reflejar la nueva cita
    })
    .catch(error => {
      console.error('Error al registrar la cita:', error);
      alert('Cita ocupada.');
    });

  }

  // Event listener para la delegación de eventos en el contenedor de horarios
  timeSlotsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-slot')) {
      const horaSeleccionada = event.target.getAttribute('data-hora');
      sessionStorage.setItem("hora", horaSeleccionada);
      sessionStorage.setItem("Date", selectedDate);
      window.location.assign('http://localhost:3003/pagohora');
      //reservarHora(selectedDate, horaSeleccionada);
    }
  });

  // Interactividad para los botones de navegación de fecha
  document.getElementById("prev-date").addEventListener("click", () => {
    selectedDate.setDate(selectedDate.getDate() - 1);
    currentDateElement.textContent = selectedDate.toLocaleDateString("es", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    obtenerCitas().then(citas => {
      actualizarHorariosDisponibles(citas, selectedDate);
    });
    generateCalendar(selectedDate);
  });

  document.getElementById("next-date").addEventListener("click", () => {
    selectedDate.setDate(selectedDate.getDate() + 1);
    currentDateElement.textContent = selectedDate.toLocaleDateString("es", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    obtenerCitas().then(citas => {
      actualizarHorariosDisponibles(citas, selectedDate);
    });
    generateCalendar(selectedDate);
  });

  // Inicialización
  currentDateElement.textContent = selectedDate.toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  obtenerCitas().then(citas => {
    actualizarHorariosDisponibles(citas, selectedDate);
  });
  generateCalendar(selectedDate); // Generar el calendario inicialmente
});

//rellenar datos del especialista en la vista
var nombreEspecialista = sessionStorage.getItem("especialista");
var Especialidad = sessionStorage.getItem("especialidad");
var centroEspecialista = sessionStorage.getItem("region");
//let rutDec = atob(rutCod); <= decodificar
var nameDec = atob(nombreEspecialista);
var especialidadDec = atob(Especialidad);
var centroDec = atob(centroEspecialista);
console.log(nameDec);
var nombre = document.getElementById("doctorName");
var especialidad = document.getElementById("doctorEspecialidad");
var centro = document.getElementById("doctorCentro");
nombre.textContent = nameDec;
especialidad.textContent = especialidadDec;
centro.textContent = centroDec;
var imgElement = document.getElementById("imgMedico");
imgElement.src = `/images/img${nameDec}.jpg`;

