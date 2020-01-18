const chai = require('chai');
const chaiHttp = require('chai-http');
const proxyquire = require('proxyquire').noCallThru();
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiHttp);
chai.use(sinonChai);

sinon.stub(console);

const gatewayUrl = 'https://www.google.com';

const savedUrlInScope = short => {
    const map = {
        us: 'about'
    };

    return map[short] || false;
};

const appModule = proxyquire('../../src/app', {
    '../config/app-config': { gatewayUrl },
    './helpers/helper-methods': {
        isSavedUrl: savedUrlInScope
    }
});

describe('Integration', () => {
    it('can serve a request', done => {
        chai.request(appModule)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('redirects to the base site when the url doesn\'t exist in the url map', done => {
        chai.request(appModule)
            .get('/bad-url')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.request.url).to.contain(gatewayUrl);
                done();
            });
    });
});
