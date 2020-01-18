const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = chai;
const { addPair, getAllPairs } = require('../../../../src/helpers/db-transactions');
chai.use(sinonChai);

const findStub = sinon.stub().resolves('entire mongo document');
const saveStub = sinon.stub().resolves('new pair added');
sinon.stub(console);

describe('DB Transactions', () => {
    describe('addPair', () => {
        const mongoType = class testClass {
                constructor() {
                    this.save = saveStub;
                }
            };

        it('calls the save method', () => {
            const newVal = { some: 'val' };
            return addPair(mongoType, newVal)
                .then(() => {
                    expect(saveStub).to.have.been.called;
                });
        });
    });

    describe('getAllPairs', () => {
        const mongoType = { find: findStub };
        afterEach(() => {
            findStub.resetHistory();
        });

        it('calls the find method', () => {
            return getAllPairs(mongoType)
                .then(() => {
                    expect(findStub).to.have.been.called;
                });
        });

        it('returns the expected document', () => {
            return getAllPairs(mongoType)
                .then(docs => {
                    expect(docs).to.eql('entire mongo document');
                });
        });
    });
});
