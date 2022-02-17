const axios = require('axios');
const commonConfig = {
    timeout: 30000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Content-Type': 'application/json'
    }
};

const axiosInstance = axios.create(commonConfig);

module.exports = axiosInstance;

