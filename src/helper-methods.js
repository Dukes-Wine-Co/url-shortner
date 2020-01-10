const { mongoShortnedUrls } = require('./mongo-connect');

const isMongoUrl = entryUrlPath => {
    const urlMap = {
        people: 'contact',
        'new-year': 'about'
    };

    return urlMap[entryUrlPath] || false;
};

module.exports = {
    isMongoUrl
};

