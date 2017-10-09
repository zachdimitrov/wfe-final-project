'use strict';

var init = function init() {
    return {
        get: function get(req, res) {
            return res.status(200).send({
                'home': 'hello, this is the home page'
            });
        }
    };
};

module.exports = { init: init };