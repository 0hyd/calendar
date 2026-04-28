function writeCalendar (cells) {
// 每 7 个格子组成一行，再写回 tbody。
    for (const [index, cellData] of cells.entries()) {
        const cell = document.createElement("div");
        const dayLabel = document.createElement("span");
        const columnIndex = index % 7;

        cell.className = "day-number";
        cell.dataset.column = columnIndex;
        dayLabel.className = "day-label";
        dayLabel.textContent = cellData.text;

        if (cellData.className) {
            cell.className = cellData.className ? cellData.className + " " + cell.className : cell.className;
        }

        cell.appendChild(dayLabel);

        // 加入节日
        if (cellData.festival) {
            const festiveItem = document.createElement("div");
            const festivalText = document.createElement("span");

            festiveItem.className = "festival";
            festivalText.textContent = cellData.festival.name;
            festivalText.className = "festival-text";

            if (cellData.festival.type === "public_holiday") {
                festiveItem.classList.add("festival-holiday");
            }
            else if (cellData.festival.type === "transfer_workday") {
                festiveItem.classList.add("festival-workday");
            }

            festiveItem.appendChild(festivalText);
            cell.appendChild(festiveItem);
        }

        if (!cell.classList.contains("empty")) {
            cell.addEventListener("click", function () {
                selectedDay = new Date();
                selectedDay.setFullYear(currentYear);
                selectedDay.setMonth(currentMonth);
                selectedDay.setDate(cellData.text);
                renderCalendar(currentYear, currentMonth);
            });
        }

        calendarBody.appendChild(cell);
    }
}