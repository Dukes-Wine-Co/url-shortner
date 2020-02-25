const trueMessage = { success: true };
const failMessage = { success: false };
const isProd = (envVal = process.env.NODE_ENV) => envVal === 'production';
const isTesting = (envVal = process.env.NODE_ENV) => envVal === 'test';

module.exports = {
    trueMessage,
    failMessage,
    isProd,
    isTesting
};
