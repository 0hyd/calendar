// 月份年份移动
const yearInput = document.querySelector("#calendar-year-input");
const monthInput = document.querySelector("#calendar-month-input");
let inputYear = currentYear;
let inputMonth = currentMonth;

const todayButton = document.querySelector("#today-button");

const addYear = document.querySelector("#add-year");
const decreaseYear = document.querySelector("#decrease-year");
const addMonth = document.querySelector("#add-month");
const decreaseMonth = document.querySelector("#decrease-month");

//首次加载
async function initCalendar() {
    await loadFestivalsData(currentYear); //等待加载节假日数据
    yearInput.value = inputYear;
    monthInput.value = inputMonth + 1;
    renderCalendar(inputYear, inputMonth);
}

initCalendar();

//切换年份再加载
async function updateCalendar(year, month) {
    if (currentYear !== year ) {
        if (year >2000 && year <= new Date().getFullYear()) {
            await loadFestivalsData(year);
        }
        else {
        solarFestivals = {};
        }
    }

    currentYear = year;
    currentMonth = month;
    renderCalendar(currentYear, currentMonth);
}

function applyInputValues() {
    if (!Number.isInteger(inputYear)) {
        yearInput.value = currentYear;
        return;
    }
    if (!Number.isInteger(inputMonth)) {
        monthInput.value = currentMonth + 1;
        return;
    }

    if (inputMonth === 0) {
        inputMonth = 12;
        inputYear--;
    }
    else if (inputMonth === 13) {
        inputMonth = 1;
        inputYear++;
    }
    else if (inputMonth < 1) {
        inputMonth = 1;
    }
    else if (inputMonth > 12) {
        inputMonth = 12;
    }

    if (inputYear < 1) {
        inputYear = 1;
    }
    else if (inputYear > 9999) {
        inputYear = 9999;
    }

    yearInput.value = inputYear;
    monthInput.value = inputMonth;

    updateCalendar(inputYear, inputMonth - 1);
}

// 检测数值变化和按键响应
function handleInputSubmit() {
    inputYear = Number(yearInput.value);
    inputMonth = Number(monthInput.value);
    applyInputValues();
}

function handleEnterSubmit(event) {
    if (event.key === "Enter") {
        handleInputSubmit();
    }
}

yearInput.addEventListener("change", handleInputSubmit);
monthInput.addEventListener("change", handleInputSubmit);

yearInput.addEventListener("keydown", handleEnterSubmit);
monthInput.addEventListener("keydown", handleEnterSubmit);

//上下增加日期
addYear.addEventListener("click", function () {
    inputYear++;
    applyInputValues();
});
decreaseYear.addEventListener("click", function () {
    inputYear--;
    applyInputValues();
});
addMonth.addEventListener("click", function () {
    inputMonth++;
    applyInputValues();
});
decreaseMonth.addEventListener("click", function () {
    inputMonth--;
    applyInputValues();
});

todayButton.addEventListener("click", function () {
    selectedDay = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
    );
    applyInputValues();
    updateCalendar(todayDate.getFullYear(), todayDate.getMonth());
});