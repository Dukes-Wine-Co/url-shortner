const rewire = require('rewire');
const { expect } = require('chai');

describe('configureMongoCollectionName', () => {
    let helperMethodModule;
    const collectionName = 'mongoUrl';

    beforeEach(() => {
        helperMethodModule = rewire('../../../../src/helpers/mongo-methods');
    });

    it('returns the same collection name when in the prod environment', () => {
        helperMethodModule.__set__('process.env.NODE_ENV', 'production');
        const prodCollectionName = helperMethodModule
            .configureMongoCollectionName(collectionName);
        expect(prodCollectionName).to.eql(collectionName);
    });

    it('returns the testing collection name when in the testing environment', () => {
        helperMethodModule.__set__('process.env.NODE_ENV', 'test');
        const prodCollectionName = helperMethodModule
            .configureMongoCollectionName(collectionName);
        expect(prodCollectionName).to.eql(`${collectionName}-testing`);
    });

    it('returns the same preProd collection name when not in the prod environment', () => {
        helperMethodModule.__set__('process.env.NODE_ENV', null);
        const prodCollectionName = helperMethodModule
            .configureMongoCollectionName(collectionName);
        expect(prodCollectionName).to.eql(`${collectionName}-preProd`);
    });
});
