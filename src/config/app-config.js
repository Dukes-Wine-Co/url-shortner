const gatewayUrl = process.env.GATEWAY_URL;
const mongoUrl = process.env.MONGO_DB_URL;
const processingApiUrl = process.env.PROCESSING_API_URL;

const config = {
    gatewayUrl,
    mongoUrl,
    processingApiUrl
};

module.exports = config;
