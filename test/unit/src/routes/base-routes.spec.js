const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const express = require('express');
const supertest = require('supertest');
const rewire = require('rewire');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('GET /', () => {
    let app;
    let route;
    let request;
    let isSavedUrlStub;
    let setDestinationStub;

    const gatewayUrl = 'https://google.com';

    beforeEach(() => {
        app = express();
        isSavedUrlStub = sinon.stub();
        setDestinationStub = sinon.stub();

        route = rewire('../../../../out/routes/base-routes');
        route.__set__('isSavedUrl', isSavedUrlStub);
        route.__set__('gatewayUrl', gatewayUrl);
        route.__set__('setRedirectDestination', setDestinationStub);

        route(app);
        request = supertest(app);
    });

    it('calls the isSavedUrlStub stub', done => {
        request
            .get('/')
            .end(() => {
                expect(isSavedUrlStub).to.have.been.calledWith('/');
                done();
            });
    });

    it('sets the destination path as whatever the isSavedUrl value is when it exists', done => {
        const destinationPath = 'something-special';
        isSavedUrlStub.returns(destinationPath);

        request
            .get('/a-good-one')
            .end(() => {
                expect(setDestinationStub).to.have.been.calledWith(destinationPath);
                done();
            });
    });

    it('returns a status code of 301', done => {
        isSavedUrlStub.returns(true);

        request
            .get('/')
            .end((err, res) => {
                expect(res.status).to.eql(301);
                done();
            });
    });
});
