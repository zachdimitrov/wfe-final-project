const passport = require('passport');

const attachTo = (app, data) => {
    const controller = require('../controllers').init(data);

    // home routes //
    app.get('/', (req, res) => {
        return controller.getHome(req, res);
    });

    // posts routes //
    app.get('/posts', (req, res) => {
        return controller.getPosts(req, res);
    });

    app.post('/posts', (req, res) => {
        return controller.addPost(req, res);
    });

    app.get('/posts/:id', (req, res) => {
        return controller.getSinglePost(req, res);
    });

    app.post('/posts/:id', (req, res) => {
        return controller.updateSinglePost(req, res);
    });

    // auth routes //
    app.post('/register', (req, res) => {
        return controller.register(req, res);
    });

    app.get('/logout', (req, res) => {
        return controller.logOut(req, res);
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    }));

    app.post('/profile', controller.verifyIsUser, (req, res) => {
        return controller.updateProfile(req, res);
    });
};

module.exports = { attachTo };
