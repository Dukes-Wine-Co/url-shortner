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

describe('GET /db', () => {
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
});
