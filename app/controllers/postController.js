const init = (data) => {
    return {
        get: (req, res) => {
            let {
                q,
                page,
                size,
            } = req.query;
            let result;

            page = parseInt(page, 10) || 1;
            size = parseInt(size, 10) || 10;

            if (q) {
                q = q.toLowerCase();
                result = data.posts.findOptions({ 'title': { $toLower: /q/ } });
            } else {
                result = data.posts.getAll();
            }

            return result.then((posts) => {
                if (!posts) {
                    return res
                        .status(404)
                        .send({
                            message: 'No posts in database!',
                        });
                }

                result = posts
                    .slice((page - 1) * size, page * size);

                return res
                    .status(200)
                    .send({
                        result: result,
                    });
            });
        },
        post: (req, res) => {
            const post = req.body;
            return data.posts.create(post)
                .then((dbItem) => {
                    return res
                        .status(200)
                        .send({
                            message: 'Post successfully created!',
                            result: post,
                        });
                })
                .catch((error) => {
                    return res
                        .status(404)
                        .send({
                            message: 'Post creation failed!',
                            error,
                        });
                });
        },
        getSingle: (req, res) => {
            const id = req.params.id;
            return data.posts.findById(id)
                .then((post) => {
                    if (!post) {
                        return res
                            .status(404)
                            .send({
                                message: 'Post not found!',
                            });
                    }

                    return res
                        .status(200)
                        .send({
                            result: post,
                        });
                });
        },
        put: (req, res) => {
            const id = req.params.id;
            return data.posts.updateById(id)
                .then((post) => {
                    if (!post) {
                        return res
                            .status(404)
                            .send({
                                message: 'Post not found!',
                            });
                    }

                    return res
                        .status(200)
                        .send({
                            message: 'Post successfully created!',
                            result: post,
                        });
                });
        },
    };
};

module.exports = { init };
