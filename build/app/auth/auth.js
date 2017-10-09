'use strict';

var applyTo = function applyTo(app, data) {
    app.use('/api', function (req, res, next) {
        var authKey = req.headers['x-auth-key'];
        var users = data.users.findOptions({
            authKey: authKey
        });

        req.user = users[0] || null;
        next();
    });
};

module.exports = { applyTo: applyTo };