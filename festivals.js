const solarFestivals = {
    "01-01": "元旦",
    "02-14": "情人节",
    "03-08": "妇女节",
    "05-01": "劳动节",
    "06-01": "儿童节",
    "09-10": "教师节",
    "10-01": "国庆节",
    "12-25": "圣诞节"
};


function createFestivals (month, day) {
    const formDate = (month + 1).toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
    if (solarFestivals[formDate]) {
        return solarFestivals[formDate];
    }
    return null;
}

