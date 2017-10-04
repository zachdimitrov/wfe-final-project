const applyTo = (app, data) => {
    app.use('/api', function(req, res, next) {
        const authKey = req.headers['x-auth-key'];
        req.user = data.users.findOptions({
            authKey: authKey,
        });
        next();
    });
};

module.exports = { applyTo };
