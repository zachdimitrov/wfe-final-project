'use strict';

var express = require('express');

var init = function init(data) {
    var app = express();

    require('./config').applyTo(app);
    require('./auth').applyTo(app, data);
    require('./routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init: init
};