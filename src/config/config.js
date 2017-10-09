/* globals process */
/* eslint-disable no-process-env */

const port = process.env.PORT || 5000;
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/tennis-vission-db';
const connectionString = {
    default: 'mongodb://localhost/tennis-vission-db',
    deploy: uri,
};

const sessionSecret = 'Purple Unicorn';

module.exports = { port, connectionString, sessionSecret };
