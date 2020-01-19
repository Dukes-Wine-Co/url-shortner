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
    '../storage': { read: () => mongoUrls },
    './constants': { isProd: true }
});


describe('Helper Methods', function() {
    describe('isSavedUrl', () => {
        const { isSavedUrl } = helperMethodModule;

        it('returns the value when the key is in the url map', () => {
            expect(isSavedUrl('us')).to.eql('about');
        });

        it('returns false when the key is not in the map', () => {
            expect(isSavedUrl('something')).to.be.false;
        });
    });

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

    describe('configureMongoCollectionName', () => {
        let helperMethodModule;
        const collectionName = 'mongoUrl';

        beforeEach(() => {
            helperMethodModule = rewire('../../../../src/helpers/helper-methods');
        });

        it('returns the same collection name when in the prod environment', () => {
            helperMethodModule.__set__('isProd', true);
            const prodCollectionName = helperMethodModule
                .configureMongoCollectionName(collectionName);
            expect(prodCollectionName).to.eql(collectionName);
        });

        it('returns the testing collection name when in the testing environment', () => {
            helperMethodModule.__set__('isTesting', true);
            const prodCollectionName = helperMethodModule
                .configureMongoCollectionName(collectionName);
            expect(prodCollectionName).to.eql(`${collectionName}-testing`);
        });

        it('returns the same preProd collection name when not in the prod environment', () => {
            helperMethodModule.__set__('isProd', false);
            helperMethodModule.__set__('isTesting', false);
            const prodCollectionName = helperMethodModule
                .configureMongoCollectionName(collectionName);
            expect(prodCollectionName).to.eql(`${collectionName}-preProd`);
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
