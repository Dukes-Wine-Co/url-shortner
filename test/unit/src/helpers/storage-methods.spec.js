const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const getStub = sinon.stub().returns({ val: true });
const setStub = sinon.stub().returns(true);
const delStub = sinon.stub().returns(1);

const nodeCache = proxyquire('../../../../src/helpers/storage-methods', {
    '../config/node-cache-config': {
        get: getStub,
        set: setStub,
        del: delStub
    }
});

describe('Storage', () => {
    describe('read', () => {
        const val = nodeCache.read('anything');
        it('calls the get method', () => {
            expect(getStub).to.have.been.called;
        });

        it('sets the read method to the return of the getStub', () => {
            const expectedVal = { val: true };
            expect(val).to.eql(expectedVal);
        });
    });

    describe('write', () => {
        const val = nodeCache.write('anything', 'value');
        it('calls the set stub', () => {
            expect(setStub).to.have.been.called;
        });

        it('returns true when the value is successfully set', () => {
            expect(val).to.be.true;
        });
    });

    describe('deleteEntry', () => {
        const val = nodeCache.deleteEntry('anything');
        it('calls the del stub', () => {
            expect(delStub).to.have.been.called;
        });

        it('returns 1 to signify the deletion', () => {
            expect(val).to.eql(1);
        });
    });
});
