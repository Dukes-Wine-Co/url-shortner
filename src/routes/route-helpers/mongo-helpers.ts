import { parseRequestDetails } from '../../helpers/logger-methods';
import { processingApiUrl } from '../../config/app-config';
import axiosInstance from '../../config/axios-config';

export const saveRequest = async(request, parseDetails = true, index?) => {
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

export const enrichRequest = async(request, parseDetails = true, index?) => {
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
