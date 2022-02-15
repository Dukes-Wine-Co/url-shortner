const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { mongoUrl } = require('./app-config');
const {
    mongoConnect,
    configureMongoCollectionName
} = require('../helpers/mongo-methods');

mongoose.set('useCreateIndex', true);
mongoConnect(mongoose, mongoUrl);

const urlMapSchema = mongoose.Schema({
    short: {
        type: String,
        required: true,
        unique: true
    },
    destination: {
        type: String,
        required: true,
        unique: false
    }
});

const requestSchema = mongoose.Schema({
    statusCode: {
        type: String
    },
    originalPath: {
        type: String
    },
    referrer: {
        type: String
    },
    userAgent: {
        type: String
    },
    ip: {
        type: String
    },
    acceptLanguage: {
        type: String
    },
    domain: {
        type: String
    },
    correlationId: {
        type: String
    },
    timestamp: {
        type: Number,
        required: true
    },
    redirectUrl: {
        type: String
    }
});

urlMapSchema.plugin(findOrCreate);
requestSchema.plugin(findOrCreate);

module.exports = {
    mongoShortnedUrls: mongoose.model(configureMongoCollectionName('shortUrl'), urlMapSchema),
    savedRequests: mongoose.model(configureMongoCollectionName('savedRequest'), requestSchema)
};
