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

// returns true if db is valid, false otherwise
function validateDatabase(db) {
    return !!db;
}

// returns a String dictating what a valid db should look like
function getInvalidDatabaseResponse(db) {
    return 'Invalid database.';
}

// returns true if emoji is valid, false otherwise
function validateEmoji(emoji) {
    if (typeof emoji !== 'string') {
        return false;
    }

    return emoji_tool.hasEmoji(emoji);
}

// returns a String dictating what a valid emoji should look like
function getInvalidEmojiResponse(emoji) {
    return 'Invalid emoji: ' + emoji + '. Should match: https://www.npmjs.com/package/node-emoji';
}

module.exports = {
    validateObject,
    validateDatabase, getInvalidDatabaseResponse,
    validateEmoji, getInvalidEmojiResponse
}
