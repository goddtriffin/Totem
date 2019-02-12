const emoji_tool = require('node-emoji');

// returns true if every property in the given object is tied to a non-null value
// allows properties tied to the value of zero
function validateObject(object) {
    return Object.keys(object).every(p => {
        if (object[p] === 0) {
            return true;
        }

        return object[p];
    });
}

function validateDatabase(db) {
    return !!db;
}

function validateEmoji(emoji) {
    if (typeof emoji !== 'string') {
        return false;
    }

    return emoji_tool.hasEmoji(emoji);
}

module.exports = {
    validateObject,
    validateDatabase,
    validateEmoji
}
