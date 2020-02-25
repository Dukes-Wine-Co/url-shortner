const chai = require('chai');
const chaiHttp = require('chai-http');
const proxyquire = require('proxyquire').noCallThru();
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const express = require('express');
const supertest = require('supertest');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('GET /', () => {
    let app;
    let route;
    let request;
    let isSavedUrlStub;

    beforeEach(() => {
        app = express();
        isSavedUrlStub = sinon.stub();

        route = proxyquire('../../../src/routes/base-routes', {
            '../helpers/helper-methods': {
                isSavedUrl: isSavedUrlStub
            },
            '../../config/app-config': {
                gatewayUrl: 'google.com'
            }
        });

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
