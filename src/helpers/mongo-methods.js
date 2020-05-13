const { logInfo, logError } = require('./logger-methods');

const mongoConnect = (mongooseInstance, mongoUrl) => {
    mongooseInstance.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        logInfo('Connection to mongo database established 🐍');
    })
    .catch(e => {
        logError(`There was an error connecting to the mongo database: ${e}`);
    });
};

const configureMongoCollectionName = name => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return name;
        case 'test':
            return `${name}-testing`;
        default:
            return `${name}-preProd`;
    }
};


module.exports = {
    mongoConnect,
    configureMongoCollectionName
};
