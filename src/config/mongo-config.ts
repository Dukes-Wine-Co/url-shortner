import { mongoUrl as MONGO_DB_URL } from './app-config';
import mongoose from 'mongoose';
import { configureMongoCollectionName, mongoConnect } from '../helpers/mongo-methods';
import * as Logger from "../helpers/logger-methods"

(async() => {
    try {
        await mongoConnect(mongoose, MONGO_DB_URL);

        Logger.logInfo({
            message: 'Connection to mongo database established 🐍'
        });
    } catch (e) {
        Logger.logError({
            message: 'There was an error connecting to the mongo database',
            error: e
        });

        throw new Error(e);
    }
})();

const urlMapSchema = new mongoose.Schema({
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

const requestSchema = new mongoose.Schema({
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

export const mongoShortnedUrls = mongoose.model(configureMongoCollectionName('shortUrl'), urlMapSchema);
export const savedRequests = mongoose.model(configureMongoCollectionName('savedRequest'), requestSchema)
