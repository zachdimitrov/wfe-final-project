const express = require('express');
const bodyParser = require('body-parser');
const mongoMorgan = require('mongo-morgan');
const config = require('../../config');

const applyTo = (app) => {
    app.use(mongoMorgan(config.connectionString.deploy, 'combined', {
        collection: 'logs',
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('build/static' || 'src/static'));
    app.use('/libs', express.static('node_modules'));
};

module.exports = { applyTo };
