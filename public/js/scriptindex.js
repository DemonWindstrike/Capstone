const nPaciente = getCookie("usuario");
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


//funcion cookies obtencion de datos
  
function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null; // Devolver null si la cookie no se encuentra
}

//Chatbox

document.addEventListener('DOMContentLoaded', (event) => {
  setTimeout(() => {
      document.getElementById('notification-alert').style.display = 'block';
  }, 5000);
});

document.getElementById('chatbox-header').addEventListener('click', () => {
  var chatbox = document.getElementById('chatbox');
  var notificationAlert = document.getElementById('notification-alert');
  if (chatbox.style.display === 'none') {
      chatbox.style.display = 'block';
      notificationAlert.style.display = 'none';
  } else {
      chatbox.style.display = 'none';
  }
});

function sendReply(message) {
  var chatBody = document.getElementById('chatbox-body');
  chatBody.innerHTML += '<p>' + message + '</p>';
}





// Asegúrate de que la página esté cargada antes de asignar los eventos
document.addEventListener("DOMContentLoaded", function() {
  // Aquí puedes agregar cualquier código adicional que se ejecute después de cargar la página
});