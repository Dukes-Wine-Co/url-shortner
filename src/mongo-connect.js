const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { mongoUrl } = require('../config/app-config');

mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).
then(() => {
    console.info('Connection to mongo database established 🐍');
}).
catch(e => {
    console.error(`There was an error connecting to the mongo database: ${e}`);
});

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
    mongoShortnedUrls: mongoose.model('shortUrl', urlMapSchema)
};
