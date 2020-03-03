const port = process.env.PORT || '3000';
const app = require('./src/app');
const { mongoShortnedUrls } = require('./src/mongo-connect');
const { getAllPairs } = require('./src/helpers/db-transactions');
const { processUrls } = require('./src/helpers/helper-methods');
const nodeCache = require('./src/storage');
const { logInfo, logError } = require('./config/logger');

const startProcess = () => {
    getAllPairs(mongoShortnedUrls)
        .then(urls => {
            nodeCache.write('mongoUrls', processUrls(urls));
            logInfo('The urls were successfully written to the node cache');
        })
        .then(() => {
            logInfo(`Start up complete: Url shortner app listening on port ${port} 🔗`);
        })
        .catch(e => {
            logError(`There was an error retrieving the urls from the database: ${e}`);
        });
};

app.listen(port, startProcess);

module.exports = {
    startProcess
};

