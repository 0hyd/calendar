const calendarBody = document.querySelector("#calendar-grid");
const todayDate = new Date();

let currentYear = todayDate.getFullYear();
let currentMonth = todayDate.getMonth();
let selectedDay = null;

function renderCalendar(year, month) {
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

    //写入
    writeCalendar (cells);
}