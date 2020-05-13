const winston = require('winston');

const format = winston.format.combine(
    winston.format.json()
);

const logger = winston.createLogger({
    level: 'verbose',
    format,
    transports: new winston.transports.Console({})
});

module.exports = logger;
