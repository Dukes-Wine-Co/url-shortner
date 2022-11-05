import { logError, logInfo } from './logger-methods';

export const addPair = async (type, value) => {
    const val = new type(value);
    try {
        const success = await val.save();
        logInfo(`The model was successfully saved to the database: ${JSON.stringify(success)}`);
    } catch (e){
        logError(`There was an error saving the model to the database: ${e.errmsg}`);
        return e
    }
};

export const getAllPairs = async (type) => {
    try {
        return type.find({})
    } catch (e){
        logError(`There was an error finding the pairs: ${JSON.stringify(e)}`);
        return e;
    }
};
