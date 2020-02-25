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

    let consoleStub;
    const scopeHeader = 'destination-url';
    const gatewayUrl = 'https://google.com';

    beforeEach(() => {
        app = express();
        isSavedUrlStub = sinon.stub();
        consoleStub = sinon.stub();
        route = rewire('../../../src/routes/base-routes');
        route.__set__('isSavedUrl', isSavedUrlStub);
        route.__set__('gatewayUrl', gatewayUrl);
        route.__set__('console.error', consoleStub);

        route(app);
        request = supertest(app);
    });

    it('calls the isSavedUrlStub stub', done => {
        request
            .get('/')
            .end(() => {
                expect(isSavedUrlStub).to.have.been.called;
                done();
            });
    });

    it('sets the destination path as whatever the isSavedUrl value is when it exists', done => {
        const destinationPath = 'something-special';
        isSavedUrlStub.returns(destinationPath);

        request
            .get('/a-good-one')
            .end((err, res) => {
                const responseHeaders = res.res.headers;
                expect(responseHeaders[scopeHeader]).to.eql(destinationPath);
                done();
            });
    });

    it('calls console error with the expected message when the url is not saved', done => {
        const entryPath = 'some-path';
        isSavedUrlStub.returns(false);
        const expectedMessage = `bad route: ${entryPath}. redirecting to home page`;

        request
            .get(`/${entryPath}`)
            .end(() => {
                expect(consoleStub).to.have.been.calledWith(expectedMessage);
                done();
            });
    });

    it('sets the destination-url as empty when the requested url is not saved', done => {
        const entryPath = 'some-path';
        isSavedUrlStub.returns(false);

        request
            .get(`/${entryPath}`)
            .end((err, res) => {
                const responseHeaders = res.res.headers;
                expect(responseHeaders[scopeHeader]).to.be.an.empty;
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

    it('sets redirect location as a combination of the gateway url and forward url when the combination exists', done => {
        const destinationPath = 'something-special';
        isSavedUrlStub.returns(destinationPath);

        const expectedDestination = `${gatewayUrl}/${destinationPath}`;

        request
            .get('/a-good-one')
            .end((err, res) => {
                const responseHeaders = res.res.headers;
                expect(responseHeaders.location).to.eql(expectedDestination);
                done();
            });
    });
});
