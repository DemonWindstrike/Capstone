document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const cardsContainer = document.getElementById('cards-container');
  
    let pacientesData = [];
    // Hacer la llamada a la API para obtener la lista de pacientes
    fetch('http://localhost:303/api/especialistas')
    .then((response) => response.json())
    .then((data) => {
      especialistasData = data; // Almacena los datos de los especialistas
      renderCards(data); // Renderiza las tarjetas iniciales
    })
    .catch((error) => {
      console.error('Error en la solicitud a la API:', error);
    });
  
    // Función para crear una tarjeta a partir de un objeto de paciente
    function createCard(paciente) {
      const card = document.createElement('div');
      card.className = 'card-dinamic';
  
      card.innerHTML = `
        <img src="/images/img${paciente.rut_especialista}.jpg" alt="Imagen de ${paciente.nombre}">
        <div class="card-info">
          <div class="title-buttons">
            <h3>${paciente.nombre_especialista}</h3>
            <div class="buttons">
              <button id="perfil"><a style='color:white;' href="http://localhost:3003/perfil/${paciente.id_especialista}">Ver Perfil</a></button>
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
    function renderCards(data) {
      cardsContainer.innerHTML = ''; // Borra las tarjetas existentes
  
      data.forEach((especialista) => {
        const card = createCard(especialista);
        cardsContainer.appendChild(card);
      });
    }
    // searchInput.addEventListener('input', () => {
    //   const query = searchInput.value.toLowerCase();
  
    //   // Filtrar las tarjetas según la búsqueda
    //   const filteredData = especialistasData.filter((especialista) => {
    //     const especialistaData = `${especialista.nombre_especialista} ${especialista.especialidad} ${especialista.experiencia}`.toLowerCase();
    //     return especialistaData.includes(query);
    //   });
  
    //   renderCards(filteredData); // Renderiza las tarjetas filtradas
    // });
    

    // Suponiendo que ya tienes definido searchButton y geoInput en alguna parte de tu código:
const btnBuscar = document.getElementById('searchButton');
const geoInput = document.getElementById('geoInput');
const searchinput = document.getElementById('searchInput');

btnBuscar.addEventListener('click', () => {
  const searchText = searchinput.value.toLowerCase();
  const geoText = geoInput.value.toLowerCase();

  // Filtrar las tarjetas según la búsqueda y la geolocalización
  const filteredData = especialistasData.filter((especialista) => {
    const especialistaData = `${especialista.nombre_especialista} ${especialista.especialidad} ${especialista.experiencia}`.toLowerCase();
    const ubicacionData = especialista.centro_medico.toLowerCase();
    return especialistaData.includes(searchText); //&& ubicacionData.includes(geoText);
  });

  console.log(searchText); // Puedes quitar esta línea después de las pruebas

  renderCards(filteredData); // Renderiza las tarjetas filtradas
});

    // Manejar la búsqueda
  // searchButton.addEventListener('click', () => {
  //   const query = searchInput.value.toLowerCase();

  //   // Filtrar las tarjetas según la búsqueda
  //   const filteredData = especialistasData.filter((especialista) => {
  //     const especialistaData = `${especialista.nombre_especialista} ${especialista.especialidad} ${especialista.experiencia}`.toLowerCase();
  //     return especialistaData.includes(query);
  //   });
  //   console.log(query);

  //   renderCards(filteredData); // Renderiza las tarjetas filtradas
  // });
});
  