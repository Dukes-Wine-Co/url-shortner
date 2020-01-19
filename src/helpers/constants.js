const trueMessage = { success: true };
const failMessage = { success: false };
const isProd = process.env.NODE_ENV === 'production';
const isTesting = process.env.TESTING === 'true';

module.exports = {
    trueMessage,
    failMessage,
    isProd,
    isTesting
};
