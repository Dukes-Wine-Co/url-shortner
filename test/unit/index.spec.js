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

const getPairsStub = sinon.stub().resolves({});
const processUrlsStub = sinon.stub();
const writeStub = sinon.stub();

const indexModule = proxyquire('../../index', {
    './src/app': appConfig,
    './src/mongo-connect': 'some mongo urls',
    './src/helpers/db-transactions': {
        getAllPairs: getPairsStub
    },
    './src/helpers/helper-methods': {
        processUrls: processUrlsStub
    },
    './src/storage': {
        write: writeStub
    }
});

describe('Index Module', () => {
    it('calls app.listen', () => {
        indexModule;
        expect(listenStub).to.have.been.calledWith('3000', indexModule.startProcess);
    });
});
