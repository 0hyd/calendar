const calendarBody = document.querySelector("#calendar-body");

// 月份年份移动
const yearInput = document.querySelector("#calendar-year-input");
const monthInput = document.querySelector("#calendar-month-input");
const todayButton = document.querySelector("#today-button");

const todayDate = new Date();

let currentYear = todayDate.getFullYear();
let currentMonth = todayDate.getMonth();
let selectedDay = null;

function renderCalendar(year, month) {
    yearInput.value = year;
    monthInput.value = month + 1;
    calendarBody.innerHTML = "";

    // getDay() 默认是：周日 0，周一 1 ... 周六 6。
    // 你的表头是“周一到周日”，所以要把周日挪到最后一列。
    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7;

    // 下个月的第 0 天，就是这个月的最后一天。
    const totalDays = new Date(year, month + 1, 0).getDate();
    const isCurrentMonth =
        todayDate.getFullYear() === year && todayDate.getMonth() === month;
    const today = isCurrentMonth ? todayDate.getDate() : null;
    const cells = [];

    // 前面的空白占位格。
    for (let i = 0; i < startDay; i++) {
        cells.push({ text: "", className: "empty" });
    }

    // 把 1 到当月最后一天按顺序放进数组。
    for (let day = 1; day <= totalDays; day++) {
        let className = "";
        const weekIndex = cells.length % 7;

        // 现在第 5、6 列分别是周六和周日。
        if (weekIndex === 5 || weekIndex === 6) {
            className = "weekend";
        }

        if (day === today) {
            className = className ? className + " today" : "today";
        }

        if (
            selectedDay &&
            selectedDay.getFullYear() === year &&
            selectedDay.getMonth() === month &&
            selectedDay.getDate() === day
        ) {
            className = className ? className + " selected" : "selected";
        }
        cells.push({ text: day, className, festival: getSolarFestival(year, month, day) });
    }

    // 最后一行补满 7 个格子。
    while (cells.length < 42) {
        cells.push({ text: "", className: "empty" });
    }

    // 每 7 个格子组成一行，再写回 tbody。
    for (let i = 0; i < cells.length; i += 7) {
        const row = document.createElement("tr");
        const weekCells = cells.slice(i, i + 7);

        for (const cellData of weekCells) {
            const cell = document.createElement("td");

            cell.textContent = cellData.text;

            if (cellData.className) {
                cell.className = cellData.className;
            }

            // 加入节日
            if (cellData.festival) {
                const festiveItem = document.createElement("div");

                festiveItem.textContent = cellData.festival.name;
                if (cellData.festival.type === "public_holiday") {
                    festiveItem.className = "festival";
                }
                else if (cellData.festival.type === "transfer_workday") {
                    festiveItem.className = "workday";
                }
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

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

//切换年份再加载
async function updateCalendar(year, month) {
    if (currentYear !== year) {
        await loadFestivalsData(year);
    }

    currentYear = year;
    currentMonth = month;
    renderCalendar(currentYear, currentMonth);
}

//首次加载
async function initCalendar() {
    await loadFestivalsData(currentYear); //等待加载节假日数据
    renderCalendar(currentYear, currentMonth);
}

function applyInputValues() {
    const inputYear = Number(yearInput.value);
    const inputMonth = Number(monthInput.value - 1);
    
    if (!Number.isInteger(inputYear) || inputYear < 1 || inputYear > 9999)
    {
        yearInput.value = currentYear;
        return;
    }

    if (!Number.isInteger(inputMonth) || inputMonth < 0 || inputMonth > 11)
    {
        monthInput.value = currentMonth + 1;
        return;
    }

    updateCalendar(inputYear, inputMonth);
}

initCalendar();

todayButton.addEventListener("click", function () {
    selectedDay = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
    );
    updateCalendar(todayDate.getFullYear(), todayDate.getMonth());
});

// 检测数值变化和按键响应
yearInput.addEventListener("change", applyInputValues);
monthInput.addEventListener("change", applyInputValues);

yearInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        applyInputValues();
    }
});

monthInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        applyInputValues();
    }
});
