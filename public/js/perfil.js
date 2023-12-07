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
  imgLogin.classList.add("d-none");
  imgNombre.classList.remove("d-none");
  logoutButton.classList.remove("d-none");
  txtNombre.textContent = nPaciente;
}else{
  txtLogin.classList.remove("d-none");
  txtNombre.classList.add("d-none");
  imgLogin.classList.remove("d-none");
  imgNombre.classList.add("d-none");
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

async function getIdFromUrl() {
  const path = window.location.pathname;
  const parts = path.split('/');
  return Number(parts[parts.length - 1]);
}
async function fetchEspecialista(id) {
  const apiUrl = 'http://localhost:303'; // URL base configurable
  const response = await fetch(`${apiUrl}/api/especialista/${id}`);
  //console.log(response);
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
