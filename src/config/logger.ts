import * as winston from 'winston';

const format = winston.format.combine(
    winston.format.json()
);

export default winston.createLogger({
    level: 'verbose',
    format,
    transports: new winston.transports.Console({})
});
