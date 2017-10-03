const init = (data) => {
    return {
        getHome: (req, res) => {
            return res.status(200).send({
                'home': 'hello, this is the home page',
            });
        },
        getPosts: (req, res) => {
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
                result = data.posts.findByTitle(q);
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
                        context: result,
                    });
            });
        },
        addPost: (req, res) => {
            const post = req.body;
            return data.posts.create(post)
                .then((dbItem) => {
                    return res
                        .status(200)
                        .send({
                            message: 'Post successfully created!',
                            context: post,
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
        getSinglePost: (req, res) => {
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
                            context: post,
                        });
                });
        },
        updateSinglePost: (req, res) => {
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
                            context: post,
                        });
                });
        },
        // Auth user
        logOut: (req, res) => {
            req.logout();
            return res.status(200).redirect('/');
        },
        updateProfile: (req, res) => {
            const bodyUser = req.body;
            const reqUser = req.user;
            return data.users.findById(reqUser._id)
                .then((dbUser) => {
                    if (dbUser) {
                        bodyUser._id = dbUser._id;
                        if (!bodyUser.username) {
                            bodyUser.username = dbUser.username;
                        }
                        bodyUser.role = dbUser.role;
                        return Promise.resolve(bodyUser);
                    }

                    if (reqUser._id) {
                        throw new Error(`User with id: ${reqUser._id} not found!`);
                    } else {
                        throw new Error(`No user id provided!`);
                    }
                })
                .then((user) => {
                    return data.users.updateById(user);
                })
                .then((dbUser) => {
                    return res
                        .status(200)
                        .send({
                            message: 'User successfully updated!',
                            context: dbUser,
                        });
                })
                .catch((err) => {
                    return res
                        .status(404)
                        .send({
                            message: 'User not found!',
                            error: err.message,
                        });
                });
        },
        register: (req, res) => {
            const bodyUser = req.body;
            const username = bodyUser.username;
            return data.users.findByUsername(username)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('User already exists');
                    }
                    return Promise.resolve(bodyUser);
                })
                .then((user) => {
                    return data.users.create(user);
                })
                .then((dbUser) => {
                    return res
                        .status(200)
                        .send({
                            message: 'User successfully created!',
                            context: dbUser,
                        });
                })
                .catch((err) => {
                    return res
                        .status(404)
                        .send({
                            message: 'User not correct!',
                            error: err.message,
                        });
                });
        },
        // Access control
        verifyIsUser: (req, res, next) => {
            if (!req.user) {
                return res
                    .status(404)
                    .send({
                        message: 'Username not correct!',
                    });
            }
            return next();
        },
        verifyIsAdmin: (req, res, next) => {
            if (!req.user || req.user.role !== 'admin') {
                return res
                    .status(404)
                    .send({
                        message: 'User must be admin!',
                    });
            }
            return next();
        },
    };
};

module.exports = { init };
