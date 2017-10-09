'use strict';

/* eslint no-console: 0 */
var config = require('./config');
var greeting = 'Server started at: ' + config.port;

Promise.resolve().then(function () {
    return require('./db').init(config.connectionString.deploy);
}).then(function (db) {
    return require('./data').init(db);
}).then(function (data) {
    return require('./app').init(data);
}).then(function (app) {
    app.listen(config.port, function () {
        return console.log(greeting);
    });
}).catch(function (err) {
    console.log(err);
});