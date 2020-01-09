const port = process.env.PORT || '3000';
const app = require('./src/app');

app.listen(port, () => {
    console.info(`Url shortner app listening on port ${port} 🔗`);
});
