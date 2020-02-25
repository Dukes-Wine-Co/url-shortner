const { expect } = require('chai');
const constantsModule = require('../../../../src/helpers/constants');


describe('Constants', () => {
    it('sets the true message properly', () => {
        const expectedVal = { success: true };
        expect(constantsModule.trueMessage).to.eql(expectedVal);
    });

    it('sets the false message properly', () => {
        const expectedVal = { success: false };
        expect(constantsModule.failMessage).to.eql(expectedVal);
    });
});
