const rewire = require('rewire');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const express = require('express');
const supertest = require('supertest');

const { expect } = chai;
chai.use(sinonChai);

describe('GET /dependency[-]?graph', () => {
    const app = express();
    const route = rewire('../../../../src/routes/dependency-graph-route');
    const request = supertest(app);
    route(app);

    it('returns a valid response upon successfully generating dependency graph', () => request
        .get('/dependency-graph')
        .then((res) => {
            const svgString = res.body.toString();
            expect(svgString).to.contain('<svg');
            expect(svgString).to.contain('</svg>');
            expect(res.status).to.eql(200);
        })
    );

    it('sets the correct headers when serving dependency graph', () => request
        .get('/dependency-graph')
        .then((res) => {
            expect(res.headers).to.include.keys('content-type');
            expect(res.headers['content-type']).to.include('image/svg+xml');
        })
    );

    it('returns a 404 status code with appropriate error message when unable to generate dependency graph', () => {
        const revertStub = route.__set__('viz', { renderString: sinon.stub().rejects() });

        return request
            .get('/dependency-graph')
            .then((res) => {
                expect(res.status).to.eql(404);
                expect(res.text).to.eql('Page not found');
                revertStub();
            });
    });
});
