const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const applyTo = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser('keyboard cat'));
};

module.exports = { applyTo };
