const cron = require('node-cron');

const jobs = {};

function init() {
    jobs['expire-polls'] = createExpirePollsJob();
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

function createExpirePollsJob() {
    return cron.schedule('* * * * *', () => {
        console.log('running a task every minute');
    }, {
        scheduled: false
    });
}

module.exports = {
    init,
    start, startAll,
    stop, stopAll
}
