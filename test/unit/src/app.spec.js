const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const useStub = sinon.stub();
const urlencodedStub = sinon.stub();
const jsonStub = sinon.stub();
const savedUrlStub = sinon.stub().returns('about');
const dbRoutesStub = sinon.stub().returns({});

const appModule = proxyquire('../../../src/app', {
    'express': () => ({ use: useStub }),
    'body-parser': {
        urlencoded: urlencodedStub,
        json: jsonStub
    },
    './helpers/helper-methods': {
        isSavedUrl: savedUrlStub
    },
    '../config/app-config': {
        gatewayUrl: 'gateway.url'
    },
    './routes/db-routes': dbRoutesStub
});

describe('App Configs', () => {
    describe('express', () => {
        appModule;

        it('calls the urlencoded configuration as extended', () => {
            expect(urlencodedStub).to.have.been.calledWith({
                extended: true
            });
        });

        it('calls json configuration', () => {
            expect(jsonStub).to.have.been.called;
        });

        it('loads in the database routes', () => {
            expect(dbRoutesStub).to.have.been.calledWith(appModule);
        });
    });
});
