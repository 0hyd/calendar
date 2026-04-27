let solarFestivals = {};

async function loadFestivalsData (year) {
    let response = {};
    if (year > 2026) {
        const url = `https://unpkg.com/holiday-calendar/data/CN/${year}.json`;
        response = await fetch(url);
    }
    else {
        response = await fetch(`./data/${year}.json`);
    }
    const festivalsData = await response.json();

    //清空数据
    solarFestivals = {};

    for (const data of festivalsData.dates) {
        let festivalName = data.name;

        if (data.type === "transfer_workday") {
            festivalName = festivalName.replace(/补班$/, "");
        }

        solarFestivals[data.date] = {name: festivalName, type: data.type};
    }
}

function getSolarFestival (year, month, day) {
    const formDate =
        year.toString().padStart(4, "0") +
        "-" +(month + 1).toString().padStart(2, "0") +
        "-" + day.toString().padStart(2, "0");

    return solarFestivals[formDate] || null;
}
