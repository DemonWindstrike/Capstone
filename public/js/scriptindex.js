
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
      mensaje = 'Respuesta de la opción 1.';
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
  

  // Asegúrate de que la página esté cargada antes de asignar los eventos
  document.addEventListener("DOMContentLoaded", function() {
    // Aquí puedes agregar cualquier código adicional que se ejecute después de cargar la página
  });