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
    let mapRequestStub;
    let setDestinationStub;

    const gatewayUrl = 'https://google.com';

    beforeEach(() => {
        app = express();
        mapRequestStub = sinon.stub();
        setDestinationStub = sinon.stub();

        route = rewire('../../../../out/routes/external-routes');
        route.__set__('mapRequest', mapRequestStub);
        route.__set__('gatewayUrl', gatewayUrl);
        route.__set__('setRedirectDestination', setDestinationStub);

        route(app);
        request = supertest(app);
    });

    it('calls mapRequest with the first param', done => {
        request
            .get('/r/something')
            .end(() => {
                expect(mapRequestStub).to.have.been.calledWith('something');
                done();
            });
    });

    it('sets the destination path as whatever the mapRequest value is when it exists', done => {
        const destinationPath = 'destination-path';
        mapRequestStub.returns(destinationPath);

        request
            .get('/r/a-good-one')
            .end(() => {
                expect(setDestinationStub).to.have.been.called;
                done();
            });
    });

    it('returns a status code of 301', done => {
        mapRequestStub.returns(true);

        request
            .get('/r/a-good-one')
            .end((err, res) => {
                expect(res.status).to.eql(301);
                done();
            });
    });
});
