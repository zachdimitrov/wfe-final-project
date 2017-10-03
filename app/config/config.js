const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoMorgan = require('mongo-morgan');
const config = require('../../config');

const applyTo = (app) => {
    app.use(mongoMorgan(config.connectionString, 'combined', {
        collection: 'logs',
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser('keyboard cat'));
};

module.exports = { applyTo };
