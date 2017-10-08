const applyTo = (app, data) => {
    app.use('/api', function(req, res, next) {
        const authKey = req.headers['x-auth-key'];
        const users = data.users.findOptions({
            authKey: authKey,
        });

        req.user = users[0] || null;
        next();
    });
};

module.exports = { applyTo };
