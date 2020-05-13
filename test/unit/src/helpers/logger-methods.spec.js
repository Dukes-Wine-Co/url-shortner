const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

describe('Logger', () => {
    const errorStub = sinon.stub();
    const infoStub = sinon.stub();
    const httpStub = sinon.stub();

    const loggerModule = proxyquire('../../../../out/helpers/logger-methods', {
        '../config/logger': {
            error: errorStub,
            info: infoStub,
            http: httpStub
        }
    });

    describe('logError', () => {
        afterEach(() => {
            errorStub.resetHistory();
            infoStub.resetHistory();
            errorStub.resetHistory();
        });

        const { logError } = loggerModule;

        it('calls logger with the input message', () => {
            const inputMsg = 'some message';
            logError(inputMsg);
            const firstCall = errorStub.getCall(0).args[0];
            expect(firstCall.log).to.eql(inputMsg);
        });
    });

    describe('logDetails', () => {
        let sampleReq;

        beforeEach(() => {
            sampleReq = {
                res: {
                    statusCode: 200,
                    getHeaders: () => ({
                        location: 'some-redirect-url'
                    })
                },
                headers: {
                    'request-host': 'some-host',
                    'referer': 'some-referer',
                    'user-agent': 'some-agent',
                    'x-forwarded-host': 'some-forwarded-host',
                    'accept-language': 'some-language',
                    'host': 'some-other-host',
                    'correlationId': () => 'some-correlation-id'
                },
                originalUrl: 'some-url'
            };
        });

        it('returns the expected vals', () => {
            const { logDetails } = loggerModule;
            const details = logDetails(sampleReq);
            const expectedKeys = [
                'statusCode',
                'requestHost',
                'originalPath',
                'referer',
                'userAgent',
                'ip',
                'acceptLanguage',
                'domain',
                'correlationId',
                'redirectedUrl',
                'timestamp'
            ];

            expect(details).to.be.an('object').with.all.keys(expectedKeys);
        });
    });
});
