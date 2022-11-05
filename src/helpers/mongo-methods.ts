export const mongoConnect = async (mongooseInstance, mongoUrl) => {
    const connectConfig = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    return mongooseInstance.connect(mongoUrl, connectConfig)
};

export const configureMongoCollectionName = name => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return name;
        case 'test':
            return `${name}-testing`;
        default:
            return `${name}-preProd`;
    }
};
