async function getIdFromUrl() {
  const path = window.location.pathname;
  const parts = path.split('/');
  return Number(parts[parts.length - 1]);
}
async function fetchEspecialista(id) {
  const apiUrl = 'http://localhost:303'; // URL base configurable
  const response = await fetch(`${apiUrl}/api/especialista/${id}`);
  console.log(response);
  if (!response.ok) {
    throw new Error(`Error al obtener datos: ${response.statusText}`);
  }
  return await response.json();
}

function mostrarEspecialista(data) {
  const contenedor = document.getElementById('especialista');
  contenedor.innerHTML = `<div class="profile-header">
  <img src="/images/img${data.nombre_especialista}.jpg" alt="Foto de perfil" class="profile-picture">
  <h1>${data.nombre_especialista}</h1>
  <p>${data.especialidad}</p>
</div>
<div class="profile-content">
  <div class="profile-info">
    <h2>Sobre mí</h2>
    <p>Titulado de ${data.universidad}</p>
    <p>Edad: 28 años</p>
    <p>${data.descripcion}</p>
  </div>
  <div class="profile-social">
    <h2>Informacion Laboral</h2>
    <p>Años de experiencia: ${data.experiencia}</p>
    <p>Centro medico: ${data.centro_medico}</p> 
  </div>
</div>
`;
}

function escapeHTML(unsafeStr) {
  return unsafeStr.replace(/[&<"']/g, function(m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '"': return '&quot;';
      default: return '&#039;';
    }
  });
}

(async () => {
  try {
    const especialistaId = await getIdFromUrl();
    const data = await fetchEspecialista(especialistaId);
    mostrarEspecialista(data);
  } catch (error) {
    console.error('Error al cargar los datos del especialista:', error);
    // Manejo adicional del error, como mostrar un mensaje en la UI
  }
})();
