const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        return res.status(200).send({
            'home': 'hello, this is the home page',
        });
    });

    app.get('/posts', (req, res) => {
        return data.posts.getAll()
            .then((posts) => {
                return res.status(200).send({
                    context: posts,
                });
            });
    });

    app.post('/posts', (req, res) => {
        const post = req.body;
        return data.posts.create(post)
            .then((dbItem) => {
                return res.status(200).send({
                    message: 'Post successfully created!',
                    context: post,
                });
            })
            .catch((error) => {
                return res.status(404).send({
                    message: 'Post creation failed!',
                    error,
                });
            });
    });
};

module.exports = { attachTo };
