const { expect } = require('chai');
const { isValidDBReq } = require('../../../../src/helpers/request-helpers');

describe('Request Helpers', () => {
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
