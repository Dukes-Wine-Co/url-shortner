const { expect } = require('chai');
const constantsModule = require('../../../src/constants');

describe('Constants', () => {
    it('sets the true message properly', () => {
        const expectedVal = { success: true };
        expect(constantsModule.trueMessage).to.eql(expectedVal);
    });

    it('sets the false message properly', () => {
        const expectedVal = { success: false };
        expect(constantsModule.failMessage).to.eql(expectedVal);
    });

    it('sets the is prod value properly when it is production', () => {
        expect(constantsModule.isProd('production')).to.be.true;
    });

    it('sets the is prod value properly when it is false', () => {
        expect(constantsModule.isProd('not-prod')).to.be.false;
    });

    it('sets the isTesting value as true when it is test', () => {
        expect(constantsModule.isTesting('test')).to.be.true;
    });

    it('sets the isTesting value as false when it is not test', () => {
        expect(constantsModule.isTesting('not-test')).to.be.false;
    });
});
