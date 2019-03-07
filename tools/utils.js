const moment = require('moment');

const format = 'YYYY-MM-DD HH:mm:ss';

function getDatetimeString() {
    return moment().format(format);
}

function addMinutesToDatetime(datetime, minutes) {
    return moment(datetime).add(minutes, 'm').format(format);
}

module.exports = {
    getDatetimeString,
    addMinutesToDatetime
}
