document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const cardsContainer = document.getElementById('cards-container');
  
    // Hacer la llamada a la API para obtener la lista de pacientes
    fetch('http://localhost:303/api/especialistas')
      .then((response) => response.json())
      .then((data) => {
        // Recorre la lista de pacientes y crea tarjetas para cada uno
        data.forEach((paciente) => {
          const card = createCard(paciente);
          cardsContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error('Error en la solicitud a la API:', error);
      });
  
    // Función para crear una tarjeta a partir de un objeto de paciente
    function createCard(paciente) {
      const card = document.createElement('div');
      card.className = 'card';
  
      card.innerHTML = `
        <img src="/images/imgespecialista${paciente.id_especialista}.jpg" alt="Imagen de ${paciente.nombre}">
        <div class="card-info">
          <div class="title-buttons">
            <h3>${paciente.nombre_especialista}</h3>
            <div class="buttons">
              <button id="perfil">Ver Perfil</button>
              <button id="agendar">Agendar hora</button>
            </div>
          </div>
          <p>Especialidad: ${paciente.especialidad}</p>
          <p>Años de experiencia: ${paciente.experiencia}</p>
          <p>Centro Médico: ${paciente.centro_medico}</p>
        </div>
      `;
  
      return card;
    }
  
    // Manejar la búsqueda
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.toLowerCase();
      const cards = cardsContainer.querySelectorAll('.card');
  
      // Filtrar las tarjetas según la búsqueda
      cards.forEach((card) => {
        const cardNombre = card.querySelector('h3').textContent.toLowerCase();
        if (cardNombre.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  