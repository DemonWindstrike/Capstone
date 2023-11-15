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
