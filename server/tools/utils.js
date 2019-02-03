// returns true if the given object contains all the given properties
// object: {} , properties: []
function validateObject(object) {
    return Object.keys(object).every(p => {
        if (object[p] === 0) {
            return true;
        }

        return object[p];
    });
}

module.exports = {
    validateObject
}
