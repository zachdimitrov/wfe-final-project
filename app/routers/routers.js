const attachTo = (app, data) => {
    const homeController = require('../controllers/home').init();
    const userController = require('../controllers/user').init(data);
    const postController = require('../controllers/post').init(data);

    // home routes //
    app.get('/api', homeController.get);

    // posts routes //
    app.get('/api/posts', postController.get);
    app.post('/api/posts', postController.post);
    app.get('/api/posts/:id', postController.getSingle);
    app.put('/api/posts/:id', postController.put);

    // auth routes //
    app.get('/api/users', userController.get);
    app.post('/api/users', userController.post);
    app.put('/api/users', userController.put);
};

module.exports = { attachTo };
