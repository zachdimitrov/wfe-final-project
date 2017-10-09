'use strict';

var port = 3003;
var connectionString = {
    default: 'mongodb://localhost/tennis-vission-db',
    deploy: 'mongodb://admin:telerikapp1@ds013405.mlab.com:13405/tennis-vission'
    // deploy: 'mongodb://admin:telerikapp1@ds013405.mlab.com:13405/heroku_br99x7gq',
};

var sessionSecret = 'Purple Unicorn';

module.exports = { port: port, connectionString: connectionString, sessionSecret: sessionSecret };