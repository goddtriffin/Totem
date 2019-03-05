function getDatetimeString() {
    const date = new Date();

    const year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;

    let day  = date.getDate();
    day = (day < 10 ? '0' : '') + day;

    let hour = date.getHours();
    hour = (hour < 10 ? '0' : '') + hour;

    let min  = date.getMinutes();
    min = (min < 10 ? '0' : '') + min;

    let sec  = date.getSeconds();
    sec = (sec < 10 ? '0' : '') + sec;

    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}

function addMinutesToDatetime(datetime, minutes) {
    const split = datetime.split(':');
    split[1] = (parseInt(split[1]) + minutes).toString();
    return split.join(':');
}

module.exports = {
    getDatetimeString,
    addMinutesToDatetime
}
