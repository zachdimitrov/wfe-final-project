const attachTo = (app, data) => {
    const controller = require('../controllers').init(data);

    app.get('/', (req, res) => {
        return controller.getHome(req, res);
    });

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
};

module.exports = { attachTo };
