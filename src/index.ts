import app from './routes/app';
import { logError, logInfo } from './helpers/logger-methods';
import { syncAllPairs } from './modules/sheets/sync';

const port = process.env.PORT || '3000';

void (async () => {
    logInfo('Starting process');

    try {
        await syncAllPairs();

        logInfo('The urls were successfully written to the node cache');
    } catch (e){
        logError(`There was an error retrieving the urls from the database: ${e}`);
        process.exit(1);
    }

    app.listen(port, () => {
        logInfo(`Start up complete: Url shortner app listening on port ${port} 🔗`);
    });
})()
