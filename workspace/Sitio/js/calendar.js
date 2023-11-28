document.addEventListener("DOMContentLoaded", function () {
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const calendarTitle = document.getElementById("calendarTitle");
    const calendarBody = document.getElementById("calendarBody");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    updateCalendar(currentYear, currentMonth);

    prevMonthButton.addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentYear, currentMonth);
    });

    function updateCalendar(year, month) {
        calendarBody.innerHTML = "";
        calendarTitle.textContent = `${getMonthName(month)} ${year}`;
    
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
    
        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            if (i === 5 && dayCounter > daysInMonth) {
                break;
            }
    
            const row = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                if (dayCounter <= daysInMonth) {
                    const dayNumber = document.createElement("span");
                    dayNumber.textContent = dayCounter;
                    cell.appendChild(dayNumber);
                    dayCounter++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }

        // Añadir la clase 'empty' a los casilleros vacíos
        const emptyCells = document.querySelectorAll(".calendar td:not(:has(span))");
        emptyCells.forEach((cell) => {
            cell.classList.add("empty");
        });
    }

    function getMonthName(month) {
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril",
            "Mayo", "Junio", "Julio", "Agosto",
            "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return monthNames[month];
    }
});