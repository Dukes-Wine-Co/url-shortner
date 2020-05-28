const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai)

describe('Request Helpers', () => {
    const { addHSTS } = require('../../../../../src/routes/route-helpers/request-middleware');
    const setHeaderStub = sinon.stub();
    const nextStub = sinon.stub();

    beforeEach(() => {
        setHeaderStub.resetHistory();
        nextStub.resetHistory();
    });

    describe('addHSTS', () => {
        it('calls setHeader with the expected value', () => {
            const resBody = { setHeader: setHeaderStub }
            const expectedArgs = [
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
            ]

            addHSTS({}, resBody, nextStub);
            expect(setHeaderStub).to.have.been.calledWith(...expectedArgs);
        });

        it('calls next', () => {
            const resBody = { setHeader: () => {} }

            addHSTS({}, resBody, nextStub);
            expect(nextStub).to.have.been.called;
        });
    });
});
