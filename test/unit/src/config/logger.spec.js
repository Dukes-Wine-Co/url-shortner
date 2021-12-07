const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const jsonStub = sinon.stub().returns('json');
const simpleStub = sinon.stub();
const combineStub = sinon.stub().returns('combined');
const logStub = sinon.stub();
const errorStub = sinon.stub();
const createLoggerStub = sinon.stub().returns({
    log: logStub,
    error: errorStub
});
const consoleStub = sinon.stub().returns(new String('console'));

describe('Logger', () => {
    const loggerModule = proxyquire('../../../../src/config/logger', {
        winston: {
            format: {
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
        jsonStub.resetHistory();
        simpleStub.resetHistory();
        combineStub.resetHistory();
    });

    describe('set up', () => {
        it('formats the object with json', () => {
            loggerModule;
            expect(combineStub).to.have.been.calledWith(jsonStub());
        });

        it('creates the logger with the expected args', () => {
            const expectedArgs = {
                format: combineStub(),
                level: 'verbose',
                transports: consoleStub()
            };

            loggerModule;
            expect(createLoggerStub).to.have.been.calledWith(expectedArgs);
        });
    });
})
