// returns true if the given object contains all the given properties
// object: {} , properties: []
function validateObject(object, properties) {
    return properties.every(p => object[p]);
}

module.exports = {
    validateObject
}
