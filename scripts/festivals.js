let solarFestivals = {};

async function loadFestivalsData (year) {
    const response = await fetch(`./data/${year}.json`);
    const festivalsData = await response.json();

    //清空数据
    solarFestivals = {};

    for (const data of festivalsData.dates) {
        solarFestivals[data.date] = {name: data.name, type: data.type};
    }
}

function getSolarFestival (year, month, day) {
    const formDate =
        year.toString().padStart(4, "0") +
        "-" +(month + 1).toString().padStart(2, "0") +
        "-" + day.toString().padStart(2, "0");

    return solarFestivals[formDate] || null;
}