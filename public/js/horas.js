document.addEventListener('DOMContentLoaded', () => {
    const currentDateElement = document.getElementById('current-date');
    const calendarElement = document.getElementById('calendar');
    let selectedDate = new Date();
  
    function generateCalendar(date) {
      calendarElement.innerHTML = ''; // Limpiar el calendario antes de regenerar
      // Lógica para generar el calendario...
      // Puedes utilizar una biblioteca como date-fns para facilitar el manejo de fechas
    }
  
    // Agregar interactividad a los botones de horarios
    document.querySelectorAll('.time-slot').forEach(button => {
      button.addEventListener('click', () => {
        // Lógica para seleccionar un horario
      });
    });
  
    // Agregar interactividad a los botones de navegación de fecha
    document.getElementById('prev-date').addEventListener('click', () => {
      selectedDate.setDate(selectedDate.getDate() - 1);
      currentDateElement.textContent = selectedDate.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });
      generateCalendar(selectedDate);
    });
  
    document.getElementById('next-date').addEventListener('click', () => {
      selectedDate.setDate(selectedDate.getDate() + 1);
      currentDateElement.textContent = selectedDate.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });
      generateCalendar(selectedDate);
    });
  
    generateCalendar(selectedDate); // Generar el calendario inicialmente
  });
  