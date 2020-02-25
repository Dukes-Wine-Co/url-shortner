const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const useStub = sinon.stub();
const urlencodedStub = sinon.stub();
const jsonStub = sinon.stub();
const dbRoutesStub = sinon.stub().returns({});
const baseRoutesStub = sinon.stub().returns({});

const appModule = proxyquire('../../../src/app', {
    'express': () => ({ use: useStub }),
    'body-parser': {
        urlencoded: urlencodedStub,
        json: jsonStub
    },
    './routes/db-routes': dbRoutesStub,
    './routes/base-routes': baseRoutesStub
});

describe('App', () => {
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

        it('loads in the base routes', () => {
            expect(baseRoutesStub).to.have.been.calledWith(appModule);
        });
    });
});
