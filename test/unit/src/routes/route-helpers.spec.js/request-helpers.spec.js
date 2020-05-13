const proxyquire = require('proxyquire')
const { expect } = require('chai');

const testMethod = file => {
    if (file){
        return {
            us: true
        }
    }

    return false;
};

describe('Request Helpers', () => {
    const {
        isValidDBReq,
        isSavedUrl
    } = proxyquire('../../../../../out/routes/route-helpers/request-helpers', {
        '../../helpers/storage-methods': {
            read: testMethod
        }
    });

    describe('isSavedUrl', () => {
        it('returns the value when the key is in the url map', () => {
            expect(isSavedUrl('us')).to.eql(true);
        });

        it('returns false when the key is not in the map', () => {
            expect(isSavedUrl(false)).to.be.false;
        });
    });

    describe('isValidDBReq', () => {
        const sampleReq = {
            headers: {
                apikey: 'my api key'
            }
        };

        it('returns true if the request header apikey matches the dwc apikey', () => {
            const apiKey = 'my api key';
            const validReqVal = isValidDBReq(sampleReq, apiKey);
            expect(validReqVal).to.be.true;
        });

        it('returns false if the request header apikey does not matche the dwc apikey', () => {
            const apiKey = 'the api key';
            const validReqVal = isValidDBReq(sampleReq, apiKey);
            expect(validReqVal).to.be.false;
        });
    });
});
