const nPaciente = getCookie("usuario");
const imgNombre = document.getElementById("imgIconoNombre")
const imgLogin = document.getElementById("imgIconoLogin")

// Obtener el elemento <span> por su ID
const txtLogin = document.getElementById("txtLogin");
const txtNombre = document.getElementById("txtNombre"); 
const btnRegisterEspecialista = document.getElementById("btnRegisterEspecialista");
Swal.fire({
  position: "center",
  icon: "success",
  title: "Has iniciado sesión correctamente",
  showConfirmButton: true,
  confirmButtonColor: "#5cb85c",
  confirmButtonText: "Aceptar",
});

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






// Función para mostrar la notificación en el botón
function showNotification() {
  var notification = document.getElementById('notification');
  notification.style.display = 'block';
}

// Función para ocultar el chatbox
function hideChat() {
  var chatBox = document.getElementById('chat-box');
  chatBox.style.display = 'none';
}

function toggleChat() {
  var chatBox = document.getElementById('chat-box');
  var isHidden = chatBox.classList.contains('chat-hidden');
  chatBox.style.display = isHidden ? 'block' : 'none';
  chatBox.classList.toggle('chat-hidden');
}

// Función para mostrar el chatbox
function showChat() {
  var chatBox = document.getElementById('chat-box');
  chatBox.style.display = 'block';


  // Ocultar la notificación en el botón después de 2 segundos
  setTimeout(function () {
    var notification = document.getElementById('notification');
    notification.style.display = 'none';
  },); // 2000 milisegundos = 2 segundos
}

// Ocultar el chatbox al cargar la página
hideChat();

// Mostrar el chatbox después de 10 segundos
setTimeout(showChat, 3000); // 10000 milisegundos = 10 segundos

// Mostrar la notificación en el botón después de 2 segundos
setTimeout(showNotification, 2000); // 2000 milisegundos = 2 segundos
  
  // Esta función simula el envío de mensajes (puedes personalizarla)
  function sendMessage(option) {
    var chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML += "<p>Mensaje enviado: Opción " + option + "</p>";
    // Desplaza el scroll al final
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

// Agregar opciones al chat cuando la página se cargue
document.addEventListener("DOMContentLoaded", function() {
  sendMessage("Opción 1");
  sendMessage("Opción 2");
  sendMessage("Opción 3");

  // Evento de clic para las opciones en el chat
  document.getElementById('chat-messages').addEventListener('click', function(e) {
    if (e.target && e.target.matches(".chat-message")) {
      mostrarRespuesta(e.target.textContent);
    }
  });
});

function sendMessage(message) {
  var chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML += "<div class='chat-message'>" + message + "</div>";
  // Desplaza el scroll al final
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para entregar respuestas según la opción seleccionada
function mostrarRespuesta(opcion) {
  var mensaje = '';
  switch (opcion) {
    case 'Opción 1':
      mensaje = 'Ver perfil especialistas';
      break;
    case 'Opción 2':
      mensaje = 'Respuesta de la opción 2.';
      break;
    case 'Opción 3':
      mensaje = 'Respuesta de la opción 3.';
      break;
    default:
      mensaje = 'Opción no reconocida.';
      break;
  }
  sendMessage(mensaje);
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


// Asegúrate de que la página esté cargada antes de asignar los eventos
document.addEventListener("DOMContentLoaded", function() {
  // Aquí puedes agregar cualquier código adicional que se ejecute después de cargar la página
});