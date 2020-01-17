const trueMessage = { success: true };
const failMessage = { success: false };
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    trueMessage,
    failMessage,
    isProd
};
