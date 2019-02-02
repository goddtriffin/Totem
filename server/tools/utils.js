// returns true if the given object contains all the given properties
// object: {} , properties: []
function validateObject(object) {
    return Object.keys(object).every(p => object[p]);
}

module.exports = {
    validateObject
}
