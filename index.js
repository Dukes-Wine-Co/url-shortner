const port = process.env.PORT || '3000';
const app = require('./src/app');
const { mongoShortnedUrls } = require('./src/mongo-connect');
const { getAllPairs } = require('./src/helpers/db-transactions');
const { processUrls } = require('./src/helpers/helper-methods');
const nodeCache = require('./src/storage');

const startProcess = () => {
    getAllPairs(mongoShortnedUrls)
        .then(urls => {
            nodeCache.write('mongoUrls', processUrls(urls));
            console.log('The urls were successfully written to the node cache');
        })
        .then(() => {
            console.info(`Start up complete: Url shortner app listening on port ${port} 🔗`);
        })
        .catch(e => {
            console.error(`There was an error retrieving the urls from the database: ${e}`);
        });
};

app.listen(port, startProcess);

module.exports = {
    startProcess
};

