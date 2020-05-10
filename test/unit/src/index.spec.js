const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);


const listenStub = sinon.stub();
const appConfig = {
    listen: listenStub
};

const getPairsStub = sinon.stub().resolves('some-urls');
const processUrlsStub = sinon.stub().returns('urls');
const writeStub = sinon.stub();
const logInfoStub = sinon.stub();
const logErrorStub = sinon.stub();

const indexModule = proxyquire('../../../src/index', {
    './app': appConfig,
    './mongo-connect': {
        mongoShortnedUrls: 'some mongo urls'
    },
    './helpers/db-transactions': {
        getAllPairs: getPairsStub
    },
    './helpers/helper-methods': {
        processUrls: processUrlsStub
    },
    './storage': {
        write: writeStub
    },
    './config/logger': {
        logInfo: logInfoStub,
        logError: logErrorStub
    }
});

describe('Index Module', () => {
    describe('startProcess', () => {
        beforeEach(() => {
            getPairsStub.resetHistory();
            writeStub.resetHistory();
        });

        it('calls getAllPairs with the mongo urls', async() => {
            await indexModule.startProcess();
            expect(getPairsStub).to.have.been.calledWith('some mongo urls');
        });

        it('calls node cache write with the right args', async() => {
            await indexModule.startProcess();
            expect(writeStub).to.have.been.calledWith('mongoUrls', 'urls');
        });
    });

    it('calls app.listen', () => {
        indexModule;
        expect(listenStub).to.have.been.calledWith('3000', indexModule.startProcess);
    });
});
