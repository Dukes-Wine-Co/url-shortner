const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const sinonChai = require('sinon-chai');
const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('GET /db', () => {
    let app;
    let route;
    let request;
    let addPairStub;
    let isValidDBReqStub;

    beforeEach(() => {
        app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        addPairStub = sinon.stub();
        isValidDBReqStub = sinon.stub();

        route = proxyquire('../../../../out/routes/db-routes', {
            '../config/mongo-config': {
                mongoShortnedUrls: 'some-mongo-object'
            },
            '../helpers/db-transactions': {
                addPair: addPairStub,
                getAllPairs: sinon.stub()
            },
            '../helpers/logger-methods': {
                logInfo: sinon.stub(),
                logError: sinon.stub()
            },
            './route-helpers/request-helpers': {
                isValidDBReq: isValidDBReqStub
            }
        });

        route(app);
        request = supertest(app);
    });

    describe('GET /', () => {
        it('returns unauthorized calls with a false success body', done => {
            isValidDBReqStub.returns(false);

            request
                .get('/db')
                .end((err, res) => {
                    expect(res.body.success).to.be.false;
                    done();
                });
        });

        it('returns unauthorized calls with the expected response', done => {
            isValidDBReqStub.returns(false);
            const expectedMessage = 'You are not authorized to view this route.';

            request
                .get('/db')
                .end((err, res) => {
                    expect(res.body.response).to.eql(expectedMessage);
                    done();
                });
        });
    });

    describe('POST /add-pair', () => {
        it('does something', () => {
        });
    });
});
