const { parseRequestDetails } = require('../../helpers/logger-methods');
const { processingApiUrl } = require('../../config/app-config');
const axiosInstance = require('../../config/axios-config');

const saveRequest = async request => {
    const requestDetails = parseRequestDetails(request);
    return axiosInstance(`${processingApiUrl}/api/process`, {
        method: 'POST',
        data: {
            request: requestDetails,
            apikey: process.env.DWC_API_KEY
        }
    });
};

module.exports = {
    saveRequest
};