const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const nodeCacheStub = sinon.stub().returns('node cache obj');

const nodeCacheModule = proxyquire('../../../../src/config/node-cache-config', {
    'node-cache': nodeCacheStub
});

describe('Node Cache Config', () => {
    it('configures and exports an internal cache object', () => {
        nodeCacheModule;
        expect(nodeCacheStub).to.have.been.called;
    });
});
