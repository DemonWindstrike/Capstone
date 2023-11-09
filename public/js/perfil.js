function getIdFromUrl() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1];
  }
  
  function cargarEspecialista(id) {
    fetch(`http://localhost:303/api/especialista/${id}`)
      .then(response => response.json())
      .then(data => { // Asegúrate de que 'data' es el objeto que contiene la información del especialista
        const contenedor = document.getElementById('especialista');
        contenedor.innerHTML = `<div class="profile-header">
          <img src="images/especialistacardio.jpg" alt="Foto de perfil" class="profile-picture">
          <h1>${data.nombre}</h1>
          <p>Cardiologo</p>
        </div>
        <div class="profile-content">
          <div class="profile-info">
            <h2>Sobre mí</h2>
            <p>Titulado de Universidad de Chile</p>
            <p>Edad: 28 años</p>
            <p>${data.biografia}</p> <!-- Asegúrate de que 'biografia' es la propiedad correcta -->
          </div>
          <div class="profile-social">
            <h2>Informacion Laboral</h2>
            <p>Años de experiencia: ${data.experiencia} años</p> <!-- Asegúrate de que 'experiencia' es la propiedad correcta -->
            <p>Centro medico: ${data.centroMedico}</p> <!-- Asegúrate de que 'centroMedico' es la propiedad correcta -->
          </div>
        </div>`;
      })
      .catch(error => {
        console.error('Error al cargar los datos del especialista:', error);
      });
  }
  
  const especialistaId = getIdFromUrl();
  cargarEspecialista(especialistaId);
  