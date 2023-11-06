document.addEventListener('DOMContentLoaded', function() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const monthDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const calendar = document.getElementById('calendar');
    const monthYearDisplay = document.getElementById('month-year');
    
    function updateMonthYearDisplay() {
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    function generateCalendar() {
      calendar.innerHTML = ''; // Limpiar el calendario
  
      // Generar los encabezados de los días de la semana
      monthDays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('weekday-header');
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
      });
  
      // Obtener el número de días en el mes
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
      // Generar los días del calendario
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;
        dayElement.onclick = function() {
          showAvailableTimes(i);
        };
        calendar.appendChild(dayElement);
      }
    }
  
    function showAvailableTimes(day) {
        const availableTimes = document.getElementById('availableTimes');
    
        // Si el día ya estaba seleccionado, alterna la visibilidad
        if (availableTimes.getAttribute('data-selected-day') === day.toString()) {
          availableTimes.innerHTML = ''; // Limpiar los tiempos si ya se mostraron
          availableTimes.removeAttribute('data-selected-day'); // Remover el atributo para permitir la selección de nuevo
        } else {
          availableTimes.innerHTML = `<strong>Horas disponibles para el día ${day}:</strong>`; // Mostrar encabezado de horas disponibles
          availableTimes.setAttribute('data-selected-day', day); // Establecer el atributo para controlar qué día fue seleccionado
          const times = ['09:00', '10:00', '11:00', '14:00', '15:00']; // Horas de ejemplo
          
          times.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.classList.add('timeSlot');
            timeSlot.textContent = time;
            availableTimes.appendChild(timeSlot);
          });
        }
      }

      function hideAvailableTimes() {
        const availableTimes = document.getElementById('availableTimes');
        // Remover la clase cuando se ocultan las horas
        availableTimes.classList.remove('showing-times');
      }
    
    // Controles de navegación
    document.getElementById('prev-month').addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateMonthYearDisplay();
      generateCalendar();
    });
  
    document.getElementById('next-month').addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateMonthYearDisplay();
      generateCalendar();
    });
    
    // Inicialización
    updateMonthYearDisplay();
    generateCalendar();
  });
  