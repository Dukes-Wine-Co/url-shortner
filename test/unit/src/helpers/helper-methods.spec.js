const proxyquire = require('proxyquire').noCallThru();
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = chai;
const rewire = require('rewire');
chai.use(sinonChai);

const mongoUrls = {
    us: 'about',
    a: 'anything',
    b: 'but'
};

const helperMethodModule = proxyquire('../../../../src/helpers/helper-methods', {
    '../storage': { read: () => mongoUrls }
});


describe('Helper Methods', () => {
    describe('processUrls', () => {
        const urlArray = [
            { short: 'us', destination: 'about' },
            { short: 'a', destination: 'anything' },
            { short: 'b', destination: 'but' }
        ];

        const { processUrls } = helperMethodModule;

        it('flattens the url array into a simple map', () => {
            expect(processUrls(urlArray)).to.eql(mongoUrls);
        });
    });

    describe('apiResponse', () => {
        const inputObj = { success: true };
        const inputMsg = 'The test was successful';

        const outputObj = helperMethodModule.apiResponse(inputObj, inputMsg);

        it('returns an object with a response key', () => {
            expect(outputObj).to.be.an('object').to.have.any.keys('response');
        });

        it('combines the input object with the input message as a response key', () => {
            const expectedKeys = Object.keys(inputObj).concat(['response']);
            expect(outputObj).to.be.an('object').to.have.all.keys(expectedKeys);
        });
    });
});
