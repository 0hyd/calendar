let solarFestivals = {name: "", type: ""};

async function loadFestivalsData () {
    const response = await fetch("./data/2026.json");
    const festivalsData = await response.json();

    for (const data of festivalsData.dates) {
        solarFestivals[data.date] = {name: data.name, type: data.type};
    }
}

loadFestivalsData();

function getSolarFestival (year, month, day) {
    const formDate =
        year.toString().padStart(4, "0") + "-" + (month + 1).toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");

    if (solarFestivals[formDate]) {
        if (solarFestivals[formDate].type === "public_holiday") {
            return solarFestivals[formDate].name;
        }
    }

    return null;
}