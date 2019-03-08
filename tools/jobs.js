const cron = require('node-cron');

const Poll = require('../models/Poll');

const jobs = {};

function init(db) {
    jobs['expire-polls'] = createExpirePollsJob(db);
}

function start(job) {
    jobs[job].start();
}

function startAll() {
    Object.keys(jobs).forEach(job => {
        start(job);
    });
}

function stop(job) {
    jobs[job].stop();
}

function stopAll() {
    Object.keys(jobs).forEach(job => {
        stop(job);
    });
}

function createExpirePollsJob(db) {
    return cron.schedule('* * * * *', () => {
        Poll.expirePolls(db).then(response => {
            if (response.code !== 200) {
                console.error('Problem running Expire Polls job:', response);
            }
        });
    }, {
        scheduled: false
    });
}

module.exports = {
    init,
    start, startAll,
    stop, stopAll
}
