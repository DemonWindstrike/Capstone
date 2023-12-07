let centroMedicoSeleccionado = '';
let especialistaSeleccionado = '';
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

function moveHighlight(selectedTab) {
    var highlight = document.querySelector('.highlight');
    var tabs = document.querySelectorAll('.tab-container .tab');
    var tabSpecialty = document.getElementById('tabSpecialty');
    var tabProfessional = document.getElementById('tabProfessional');

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Calcular la nueva posición y ancho basado en la pestaña seleccionada
    var newLeft, newWidth;
    if (selectedTab === 'specialty') {
        newLeft = tabSpecialty.offsetLeft;
        newWidth = tabSpecialty.offsetWidth;
        tabSpecialty.classList.add('active');
    } else {
        newLeft = tabProfessional.offsetLeft;
        newWidth = tabProfessional.offsetWidth;
        tabProfessional.classList.add('active');
    }

    // Mover el highlight a la pestaña seleccionada
    highlight.style.left = `${newLeft}px`;
    highlight.style.width = `${newWidth}px`;
}

// Agregar event listeners a las pestañas
document.querySelectorAll('.tab-container .tab').forEach(tab => {
    tab.addEventListener('click', function() {
        moveHighlight(this.id === 'tabSpecialty' ? 'specialty' : 'professional');
    });
});

// Inicializar el estado de las pestañas cuando la página carga
window.addEventListener('DOMContentLoaded', () => {
    // Seleccionar automáticamente la primera pestaña o la pestaña activa existente
    var activeTab = document.querySelector('.tab-container .tab.active') || document.querySelector('.tab-container .tab');
    moveHighlight(activeTab.id === 'tabSpecialty' ? 'specialty' : 'professional');
});


// Ges section

// Añade un event listener a cada checkbox
document.querySelectorAll('.checkbox-input').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      // Desactiva todos los checkboxes
      document.querySelectorAll('.checkbox-input').forEach(function(otherCheckbox) {
        otherCheckbox.checked = false;
        otherCheckbox.nextElementSibling.style.backgroundColor = '#f0f0f0'; // Fondo por defecto
        otherCheckbox.nextElementSibling.style.color = '#6c757d'; // Color de texto por defecto
        otherCheckbox.nextElementSibling.classList.remove('active'); // Elimina la clase 'active'
      });
  
      // Activa el checkbox seleccionado
      checkbox.checked = true;
      checkbox.nextElementSibling.style.backgroundColor = '#4CAF50'; // Fondo verde
      checkbox.nextElementSibling.style.color = 'white'; // Texto blanco
      checkbox.nextElementSibling.classList.add('active'); // Añade la clase 'active'
    });
  });
  
  // Función para inicializar el estado de los checkboxes
  function initializeCheckboxes() {
    document.querySelectorAll('.checkbox-input').forEach(function(checkbox) {
      if(checkbox.checked) {
        checkbox.nextElementSibling.style.backgroundColor = '#4CAF50'; // Fondo verde
        checkbox.nextElementSibling.style.color = 'white'; // Texto blanco
        checkbox.nextElementSibling.classList.add('active'); // Añade la clase 'active'
      } else {
        checkbox.nextElementSibling.style.backgroundColor = '#f0f0f0'; // Fondo por defecto
        checkbox.nextElementSibling.style.color = '#6c757d'; // Color de texto por defecto
        checkbox.nextElementSibling.classList.remove('active'); // Elimina la clase 'active'
      }
    });
  }
  
  // Inicializa los checkboxes en la carga de la página
  window.addEventListener('load', initializeCheckboxes);

  
  //busqueda por area

  function showSpecialtySearch() {
    document.getElementById('specialtySearchContainer').style.display = 'block';
    document.getElementById('professionalSearchContainer').style.display = 'none';
}

function showProfessionalSearch() {
    document.getElementById('professionalSearchContainer').style.display = 'block';
    document.getElementById('specialtySearchContainer').style.display = 'none';
}

// Asegúrate de que este código está en tu archivo portalpatient.js o en una etiqueta <script> al final de tu body en HTML.

function moveHighlight(clickedTab) {
    var tabs = document.querySelectorAll('.tab');
    var highlight = document.querySelector('.highlight');

    // Mueve el highlight al tab seleccionado
    highlight.style.width = `${clickedTab.offsetWidth}px`;
    highlight.style.left = `${clickedTab.offsetLeft}px`;

    // Determina qué contenedor mostrar basado en el tab seleccionado
    if (clickedTab.innerText.includes('profesional')) {
        document.getElementById('professionalSearchContainer').style.display = 'block';
        document.getElementById('specialtySearchContainer').style.display = 'none';
    } else {
        document.getElementById('specialtySearchContainer').style.display = 'block';
        document.getElementById('professionalSearchContainer').style.display = 'none';
    }

    // Actualiza la clase 'active' para el tab seleccionado
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });
    clickedTab.classList.add('active');
}

// Inicializa el estado de los tabs y el highlight cuando se carga la página
window.addEventListener('load', function() {
    var activeTab = document.querySelector('.tab.active');
    moveHighlight(activeTab);
});

// Añade listeners para tabs que pueden haber sido recargados o dinámicamente alterados
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('tab')) {
        moveHighlight(event.target);
    }
});
document.addEventListener('DOMContentLoaded', () => {
  const inputUbicacion = document.getElementById('regionProf');
  const inputEspecialista = document.getElementById('inpMedico');
  inputUbicacion.addEventListener('change', (event) => {
      centroMedicoSeleccionado = event.target.value;
      cargarEspecialistasPorCentro(centroMedicoSeleccionado);
  });
  inputEspecialista.addEventListener('change', (event) => {
    especialistaSeleccionado = event.target.value;
    cargarEspecialidadesPorEspecialista(especialistaSeleccionado);
  });

  inputUbicacion.addEventListener('focus', cargarCentrosMedicos);
});


document.addEventListener('DOMContentLoaded', () => {
  const inputUbicacion = document.getElementById('region');

  inputUbicacion.addEventListener('change', (event) => {
      centroMedicoSeleccionado = event.target.value;
      cargarEspecialidadesPorCentro(centroMedicoSeleccionado);
  });

  inputUbicacion.addEventListener('focus', cargarCentrosMedicos);
});
  
  function mostrarSugerencias(listaCentros) {
    const dataList = document.getElementById('listaCentrosMedicos'); // Asegúrate de tener un <datalist> con este ID
    dataList.innerHTML = ''; // Limpia las entradas anteriores
    listaCentros.forEach(centro => {
      const option = document.createElement('option');
      option.value = centro;
      dataList.appendChild(option);
    });
  }
  
  function mostrarSugerenciasEspecialista(lista, idDatalist) {
    const dataList = document.getElementById(idDatalist);
    dataList.innerHTML = ''; // Limpia las entradas anteriores
    lista.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      dataList.appendChild(option);
    });
  }
  const btnProf = document.getElementById('btnXProfesional');
  btnProf.addEventListener("click", function() {
    const regInput = document.getElementById('regionProf');
    const espInput = document.getElementById('inpMedico');
    const especialidadInput = document.getElementById('especialidadProf');
    if (!regInput.value.trim() && !espInput.value.trim() && !especialidadInput.value.trim() ) {
      // Si el campo está vacío o solo tiene espacios en blanco
      regInput.style.borderColor = 'red';
      espInput.style.borderColor = 'red';
      especialidadInput.style.borderColor = 'red';
      // txtErrorRut.style.color = 'red'; 
      // txtErrorRut.classList.remove('d-none');
      // txtErrorRut.classList.add('d-block');
    } else {
      // Si el campo no está vacío, realiza la redirección.
      let regCod = btoa(regInput.value);
      let espCod = btoa(espInput.value);
      let especialidadCod = btoa(especialidadInput.value);
      sessionStorage.setItem('region', regCod);
      sessionStorage.setItem('especialidad', especialidadCod);
      sessionStorage.setItem('especialista', espCod);
      window.location.href = 'http://localhost:3003/horas';
    }
  });

  function cargarCentrosMedicos() {
    fetch('http://localhost:303/api/especialistas')
        .then(response => response.json())
        .then(data => {
            const centrosMedicos = data.map(especialista => especialista.centro_medico);
            const listaUnicaCentros = [...new Set(centrosMedicos)];
            mostrarSugerencias(listaUnicaCentros, 'listaCentrosMedicos');
        })
        .catch(error => console.error('Error:', error));
}

function cargarEspecialistasPorCentro(centro) {
    fetch('http://localhost:303/api/especialistas')
        .then(response => response.json())
        .then(data => {
            const especialistas = data.filter(especialista => especialista.centro_medico === centro);
            const nombresEspecialistas = especialistas.map(especialista => especialista.nombre_especialista);
            mostrarSugerencias(nombresEspecialistas, 'listaMedico');
        })
        .catch(error => console.error('Error:', error));
}

function cargarEspecialidadesPorEspecialista(especialistaNombre) {
  fetch('http://localhost:303/api/especialistas')
      .then(response => response.json())
      .then(data => {
          const especialista = data.find(e => e.nombre_especialista === especialistaNombre);
          if (especialista) {
              const especialidades = [especialista.especialidad];
              mostrarSugerencias(especialidades, 'listaEspecial');
          }
      })
      .catch(error => console.error('Error:', error));
}
  function mostrarSugerencias(lista, listaId) {
    const dataList = document.getElementById(listaId);
    dataList.innerHTML = '';
    lista.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        dataList.appendChild(option);
    });
}

function cargarEspecialidadesPorCentro(centro) {
  fetch('http://localhost:303/api/especialistas')
      .then(response => response.json())
      .then(data => {
          const especialidades = data
              .filter(especialista => especialista.centro_medico === centro)
              .map(especialista => especialista.especialidad);
          const listaUnicaEspecialidades = [...new Set(especialidades)];
          mostrarSugerencias(listaUnicaEspecialidades, 'listaEspecialidad');
      })
      .catch(error => console.error('Error:', error));
}