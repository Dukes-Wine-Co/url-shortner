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

urlMapSchema.plugin(findOrCreate);

module.exports = {
    mongoShortnedUrls: mongoose.model(configureMongoCollectionName('shortUrl'), urlMapSchema)
};
