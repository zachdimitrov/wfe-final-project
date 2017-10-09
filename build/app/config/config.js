'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoMorgan = require('mongo-morgan');
var config = require('../../config');

var applyTo = function applyTo(app) {
    app.use(mongoMorgan(config.connectionString.deploy, 'combined', {
        collection: 'logs'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('src/static'));
    app.use('/libs', express.static('node_modules'));
};

module.exports = { applyTo: applyTo };