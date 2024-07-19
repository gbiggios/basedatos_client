document.addEventListener('DOMContentLoaded', () => {
    const monthYear = document.getElementById('monthYear');
    const calendarDays = document.getElementById('calendarDays');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const eventPopup = document.getElementById('eventPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDetails = document.getElementById('popupDetails');
    const closePopup = document.querySelector('.close');

    let currentDate = new Date();
    const events = [
        { date: '2024-07-15', name: 'Ensayo General', details: 'Ensayo general para el concierto de invierno.' },
        { date: '2024-07-18', name: 'Concierto de Invierno', details: 'Concierto de Invierno en el Teatro Municipal.' },
        { date: '2024-07-20', name: 'Reunión de Planificación', details: 'Reunión de planificación para futuros eventos.' }
    ];

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

        calendarDays.innerHTML = '';

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            calendarDays.appendChild(emptyCell);
        }

        for (let date = 1; date <= lastDate; date++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day');
            dayCell.textContent = date;

            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === date;
            });

            const eventsContainer = document.createElement('div');
            eventsContainer.classList.add('events');

            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event');
                eventElement.textContent = event.name;
                eventsContainer.appendChild(eventElement);
            });

            dayCell.appendChild(eventsContainer);
            dayCell.addEventListener('click', () => {
                if (dayEvents.length > 0) {
                    popupTitle.textContent = `Eventos del ${date} de ${currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`;
                    popupDetails.innerHTML = dayEvents.map(event => `<strong>${event.name}</strong><br>${event.details}`).join('<br><br>');
                    eventPopup.style.display = 'block';
                }
            });

            calendarDays.appendChild(dayCell);
        }
    }

    closePopup.addEventListener('click', () => {
        eventPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === eventPopup) {
            eventPopup.style.display = 'none';
        }
    });

    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
