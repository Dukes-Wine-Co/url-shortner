const addHSTS = (req, res) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
};

const redirectHttps = (req, res, next, addHSTSMethod = addHSTS) => {
    if (req.secure) {
        addHSTSMethod(req, res);
        next();
    } else {
        res.redirect(`https://${req.headers.host}${req.url}`);
    }
};

module.exports = {
    addHSTS,
    redirectHttps
};
