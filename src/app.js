const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('validate response');
    next();
})

app.use('/', (req, res, next) => {
    res.send({
        success: true
    });
});

module.exports = app;
