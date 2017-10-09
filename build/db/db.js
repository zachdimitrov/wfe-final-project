'use strict';

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var init = function init(connectionString) {
    return MongoClient.connect(connectionString);
};

module.exports = { init: init };