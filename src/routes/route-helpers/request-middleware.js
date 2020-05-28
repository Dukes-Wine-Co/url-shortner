const addHSTS = (req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    next();
};

module.exports = {
    addHSTS
};
