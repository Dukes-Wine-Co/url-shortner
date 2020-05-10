const isValidDBReq = (req, dwcApiKey = process.env.DWC_API_KEY) => {
    return req.headers?.apikey === dwcApiKey;
};

module.exports = {
    isValidDBReq
};
