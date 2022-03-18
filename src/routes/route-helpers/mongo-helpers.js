const { parseRequestDetails } = require('../../helpers/logger-methods');
const { processingApiUrl } = require('../../config/app-config');
const axiosInstance = require('../../config/axios-config');

const saveRequest = async(request, parseDetails = true, index) => {
    const requestDetails = parseDetails ? parseRequestDetails(request) : request;
    return axiosInstance(`${processingApiUrl}/api/process`, {
        method: 'POST',
        headers: {
            apikey: process.env.DWC_API_KEY
        },
        data: {
            request: requestDetails
        }
    });
};

const enrichRequest = async(request, parseDetails = true, index) => {
    const requestDetails = parseDetails ? parseRequestDetails(request) : request;
    return axiosInstance(`${processingApiUrl}/api/enrich`, {
        method: 'POST',
        headers: {
            apikey: process.env.DWC_API_KEY
        },
        data: {
            request: requestDetails
        }
    });
};

module.exports = {
    saveRequest,
    enrichRequest
};