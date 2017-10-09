'use strict';

/* globals process */
/* eslint-disable no-process-env */

var port = process.env.PORT || 5000;
var uri = process.env.MONGOLAB_URI;
var connectionString = {
    default: 'mongodb://localhost/tennis-vission-db',
    // deploy: 'mongodb://admin:telerikapp1@ds013405.mlab.com:13405/tennis-vission',
    // deploy: 'mongodb://admin:telerikapp1@ds013405.mlab.com:13405/heroku_br99x7gq',
    // deploy: 'mongodb://admin:telerikapp1@ds113505.mlab.com:13505/heroku_rlflgqcx',
    deploy: uri
};

var sessionSecret = 'Purple Unicorn';

module.exports = { port: port, connectionString: connectionString, sessionSecret: sessionSecret };