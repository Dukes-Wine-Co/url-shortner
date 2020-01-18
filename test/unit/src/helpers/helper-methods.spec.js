const proxyquire = require('proxyquire').noCallThru();
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = chai;
chai.use(sinonChai);

const mongoUrls = {
    us: 'about',
    a: 'anything',
    b: 'but'
};

const helperMethodModule = proxyquire('../../../../src/helpers/helper-methods', {
    '../storage': {
        read: () => mongoUrls
    }
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
});
