const gatewayUrl = process.env.GATEWAY_URL;
const mongoUrl = process.env.MONGO_DB_URL;

const config = {
    gatewayUrl,
    mongoUrl
};

module.exports = config;
