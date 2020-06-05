const proxyquire = require('proxyquire')
const chai = require('chai')
const {expect} = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai)

const testMethod = file => {
    if (file) {
        return {
            us: true
        }
    }

    return false;
};

describe('Request Helpers', () => {
    const logErrorStub = sinon.stub();

    const {
        isValidDBReq,
        isSavedUrl,
        mapRequest,
        setRedirectDestination
    } = proxyquire('../../../../../out/routes/route-helpers/request-helpers', {
        '../../helpers/storage-methods': {
            read: testMethod
        },
        '../../helpers/logger-methods': {
            logError: logErrorStub
        }
    });

    beforeEach(() => {
        logErrorStub.resetHistory();
    });

    describe('isSavedUrl', () => {
        it('returns the value when the key is in the url map', () => {
            expect(isSavedUrl('/us')).to.eql(true);
        });

        it('returns an empty string when the blank route is served', () => {
            expect(isSavedUrl('/')).to.eql('');
        });

        it('returns false when the key is not in the map', () => {
            expect(isSavedUrl('/false')).to.be.false;
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

    describe('mapRequest', () => {
        it('returns false if the key is not in the map', () => {
            expect(mapRequest('anything', {})).to.be.false
        });

        it('returns true if the key is in the map', () => {
            expect(mapRequest('anything', {anything: true})).to.be.true
        });
    });

    describe('setRedirectDestination', () => {
        const setStub = sinon.stub();

        beforeEach(() => {
            setStub.resetHistory();
        });

        const testRes = {
            set: setStub
        }

        const testReq = {
            path: 'something'
        }

        const destUrl = 'https://www.google.com'

        it('calls res.set with the right args when destination url is set', () => {
            setRedirectDestination(destUrl, testRes, testReq);
            expect(setStub).to.have.been.calledWith('destination-url', destUrl)
        });

        it('does not call logError when dest url is an empty string', () => {
            setRedirectDestination('', testRes, testReq);
            expect(logErrorStub).to.have.not.been.called;
        });

        it('calls logError with the right args when destination url is not set', () => {
            const expectedLogArg = {
                entryPath: testReq.path,
                log: 'invalid location. redirecting to home page'
            }

            setRedirectDestination(false, testRes, testReq);
            expect(logErrorStub).to.have.been.calledWith(expectedLogArg)
        });

        it('calls res.set with the right args when destination url is not set', () => {
            setRedirectDestination(false, testRes, testReq);
            expect(setStub).to.have.been.calledWith('destination-url', '')
        });
    });
});
