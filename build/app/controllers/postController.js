'use strict';

var init = function init(data) {
    return {
        get: function get(req, res) {
            var _req$query = req.query,
                q = _req$query.q,
                page = _req$query.page,
                size = _req$query.size;

            var result = void 0;

            page = parseInt(page, 10) || 1;
            size = parseInt(size, 10) || 10;

            if (q) {
                q = q.toLowerCase();
                result = data.posts.findOptions({ 'title': { $toLower: /q/ } });
            } else {
                result = data.posts.getAll();
            }

            return result.then(function (posts) {
                if (!posts) {
                    return res.status(404).send({
                        message: 'No posts in database!'
                    });
                }

                result = posts.slice((page - 1) * size, page * size);

                return res.status(200).send({
                    result: result
                });
            });
        },
        post: function post(req, res) {
            var post = req.body;
            return data.posts.create(post).then(function (dbItem) {
                return res.status(200).send({
                    message: 'Post successfully created!',
                    result: post
                });
            }).catch(function (error) {
                return res.status(404).send({
                    message: 'Post creation failed!',
                    error: error
                });
            });
        },
        getSingle: function getSingle(req, res) {
            var id = req.params.id;
            return data.posts.findById(id).then(function (post) {
                if (!post) {
                    return res.status(404).send({
                        message: 'Post not found!'
                    });
                }

                return res.status(200).send({
                    result: post
                });
            });
        },
        put: function put(req, res) {
            var post = req.body;
            return data.posts.updateById(post).then(function (p) {
                if (!p) {
                    return res.status(404).send({
                        message: 'Post not found!'
                    });
                }

                return res.status(200).send({
                    message: 'Post successfully updated!',
                    result: post
                });
            });
        }
    };
};

module.exports = { init: init };