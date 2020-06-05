const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai)

describe('Request Helpers', () => {
    const { addHSTS, redirectHttps } = require('../../../../../src/routes/route-helpers/request-middleware');
    const setHeaderStub = sinon.stub();
    const nextStub = sinon.stub();
    const redirectStub = sinon.stub();

    beforeEach(() => {
        setHeaderStub.resetHistory();
        nextStub.resetHistory();
        redirectStub.resetHistory();
    });

    describe('addHSTS', () => {
        it('calls setHeader with the expected value', () => {
            const resBody = { setHeader: setHeaderStub }
            const expectedArgs = [
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
            ]

            addHSTS({}, resBody);
            expect(setHeaderStub).to.have.been.calledWith(...expectedArgs);
        });
    });

    describe('redirectHttps', () => {
        const insecureReqBody = {
            secure: false,
            headers: {
                host: 'some-host'
            },
            url: '.url'
        }

        const resBody = {
            redirect: redirectStub
        }

        const addHSTSStub = sinon.stub();

        beforeEach(() => {
            addHSTSStub.resetHistory()
        });

        it('calls addHSTS with the input req and res when the method is secure', () => {
            const reqBody = {secure: true}
            redirectHttps(reqBody, resBody, nextStub, addHSTSStub);
            expect(addHSTSStub).to.have.been.calledWith(reqBody, resBody);
        });

        it('calls next if the request is secure', () => {
            const reqBody = {secure: true}
            redirectHttps(reqBody, resBody, nextStub, addHSTSStub);
            expect(nextStub).to.have.been.called;
        });

        it('does not call next if the request is not secure', () => {
            redirectHttps(insecureReqBody, resBody, nextStub, addHSTSStub);
            expect(nextStub).to.have.not.been.called;
        });

        it('calls redirect to the expected url', () => {
            redirectHttps(insecureReqBody, resBody, nextStub, addHSTSStub);
            expect(redirectStub).to.have.been.calledWith('https://some-host.url')
        });
    });
});
