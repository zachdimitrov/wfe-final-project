const express = require('express');
const bodyParser = require('body-parser');

const init = (data) => {
    const app = express();

    require('./config').applyTo(app);
    require('./auth').applyTo(app, data);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require('./routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
