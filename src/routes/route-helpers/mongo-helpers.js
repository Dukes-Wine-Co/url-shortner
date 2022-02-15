const { parseRequestDetails } = require('../../helpers/logger-methods');
const { savedRequests } = require('../../config/mongo-config');

const saveRequest = async request => {
    const requestDetails = parseRequestDetails(request);
    const reqDoc = new savedRequests(requestDetails);
    return reqDoc.save(reqDoc);
};

module.exports = {
    saveRequest
};