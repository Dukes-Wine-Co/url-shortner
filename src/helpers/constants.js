const trueMessage = { success: true };
const failMessage = { success: false };
const isProd = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'test';

module.exports = {
    trueMessage,
    failMessage,
    isProd,
    isTesting
};
