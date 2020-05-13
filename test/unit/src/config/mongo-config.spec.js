const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { expect } = chai;

chai.use(sinonChai);

const mongoUrl = 'mongo url';
const findOrCreateString = 'find or create';

const setStub = sinon.stub();
const pluginStub = sinon.stub();
const modelStub = sinon.stub().returns('mongo model');
const mongoConnectStub = sinon.stub();

const mongooseObj = {
    set: setStub,
    Schema: args => Object.assign({ plugin: pluginStub }, args),
    model: modelStub
};

const mongoConnectModule = proxyquire('../../../../src/config/mongo-config', {
    'mongoose-findorcreate': findOrCreateString,
    './app-config': {
        mongoUrl
    },
    'mongoose': mongooseObj,
    '../helpers/mongo-methods': {
        configureMongoCollectionName: url => url,
        mongoConnect: mongoConnectStub
    }
});


describe('Mongo Connect', () => {
    it('sets the mongo configuration with the right arguments', () => {
        const expectedArguments = ['useCreateIndex', true];
        expect(setStub).to.have.been.calledWith(...expectedArguments);
    });

    it('connects to mongo with the proper arguments', () => {
        const expectedArgs = [mongooseObj, mongoUrl];

        expect(mongoConnectStub).to.have.been.calledWith(...expectedArgs);
    });

    it('sets the findOrCreate plugin', () => {
        expect(pluginStub).to.have.been.calledWith(findOrCreateString);
    });

    describe('urlMapSchema', () => {
        const expectedUrlSchema = {
            short: {
                type: String,
                required: true,
                unique: true
            },
            destination: {
                type: String,
                required: true,
                unique: false
            }
        };

        mongoConnectModule.mongoShortenedUrls;

        it('exports the mongoModel with the right arguments', () => {
            const expectedArgs = [
                'shortUrl',
                Object.assign(expectedUrlSchema, { plugin: pluginStub })
            ];

            expect(modelStub).to.have.been.calledWith(...expectedArgs);
        });
    });
});
