async function getIdFromUrl() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return Number(parts[parts.length - 1]);
  }
  function idToColor(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Limitar el hash a un rango que evite el blanco y el negro
    let color = (hash & 0x7F7F7F).toString(16);
    while (color.length < 6) {
        color = '0' + color;
    }
  
    return '#' + color;
  }

async function fetchEvents() {
    try {
        let id = await getIdFromUrl();
        const response = await fetch(`http://localhost:303/api/citas/${id}`); // Cambia a la URL de tu API
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const eventos = await response.json();
        return eventos.map(evento => ({
            title: evento.titulo_cita,
            start: evento.fecha_inicio_evento,
            end: evento.fecha_termino_evento,
            contentHeight: 'auto',
            color: idToColor(evento.id_especialista.toString()),
            textColor: '#FFFFFF'
        }));
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    var calendarEl = document.getElementById('calendar');
    var calendarEvents = await fetchEvents(); // Obtener eventos de la base de datos
    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'en',
        initialView: 'timeGridWeek',
        events: calendarEvents,
        hour: '2-digit',
        minute: '2-digit'
    });
    calendar.render();
});
//generateCalendar(new Date().getMonth() + 1, new Date().getFullYear());