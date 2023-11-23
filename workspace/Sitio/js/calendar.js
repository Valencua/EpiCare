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

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                if (dayCounter <= daysInMonth) {
                    cell.textContent = dayCounter;
                    dayCounter++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
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