const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const colorizeStub = sinon.stub().returns('colorize');
const jsonStub = sinon.stub().returns('json');
const simpleStub = sinon.stub();
const combineStub = sinon.stub().returns('combined');
const logStub = sinon.stub();
const createLoggerStub = sinon.stub().returns({
    log: logStub
});
const consoleStub = sinon.stub().returns(new String('console'));

describe('Logger', () => {
    const loggerModule = proxyquire('../../../config/logger', {
        winston: {
            format: {
                colorize: colorizeStub,
                json: jsonStub,
                simple: simpleStub,
                combine: combineStub
            },
            transports: {
                Console: consoleStub
            },
            createLogger: createLoggerStub
        }
    });

    afterEach(() => {
        colorizeStub.resetHistory();
        jsonStub.resetHistory();
        simpleStub.resetHistory();
        combineStub.resetHistory();
    });

    describe('set up', () => {
        it('formats the object with colorize and json', () => {
            loggerModule;
            expect(combineStub).to.have.been.calledWith(colorizeStub(), jsonStub());
        });

        it('creates the logger with the expected args', () => {
            const expectedArgs = {
                format: combineStub(),
                level: 'info',
                transports: consoleStub()
            };

            loggerModule;
            expect(createLoggerStub).to.have.been.calledWith(expectedArgs);
        });
    });

    describe('logger.error', () => {
        afterEach(() => {
            logStub.resetHistory();
        });

        const { logger } = loggerModule;

        it('calls logger log with the level of error', () => {
            logger.error('some message');
            const firstCall = logStub.getCall(0).args[0];
            expect(firstCall.level).to.eql('error');
        });

        it('calls logger with the input message', () => {
            const inputMsg = 'some message';
            logger.error(inputMsg);
            const firstCall = logStub.getCall(0).args[0];
            expect(firstCall.message).to.eql(inputMsg);
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
