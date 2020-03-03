const { logInfo, logError } = require('../../config/logger');

const addPair = (type, value) => {
    const val = new type(value);
    return val.save()
        .then(success => {
            logInfo(`The model was successfully saved to the database: ${JSON.stringify(success)}`);
        })
        .catch(e => {
            logError(`There was an error saving the model to the database: ${e.errmsg}`);
            return e;
        });
};

const getAllPairs = type => {
    return type.find({})
        .catch(e => {
            logError(`There was an error finding the pairs: ${JSON.stringify(e)}`);
            return e;
        });
};

module.exports = {
    addPair,
    getAllPairs
};
