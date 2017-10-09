'use strict';

var init = function init(data) {
    var AUTH_KEY_LENGTH = 60;
    var AUTH_KEY_CHARS = 'qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM';

    function generateAuthKey(id) {
        var authKey = id;
        var index = void 0;

        while (authKey.length < AUTH_KEY_LENGTH) {
            index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
            authKey += AUTH_KEY_CHARS[index];
        }
        return authKey;
    }

    return {
        get: function get(req, res) {
            var user = req.user;
            if (!user) {
                return res.status(401).send('Unauthorized user!');
            }

            return data.users.findOptions({
                username: user.username,
                _id: user.id
            }).then(function (u) {
                return res.send({
                    result: u
                });
            });
        },

        post: function post(req, res) {
            var user = req.body;
            if (!user || typeof user.username !== 'string' || typeof user.passHash !== 'string') {
                return res.status(400).send('Invalid user');
            }

            return data.users.findOptions({
                usernameToLower: user.username.toLowerCase()
            }).then(function (dbUser) {
                if (dbUser.length > 0) {
                    return res.status(400).send('Duplicated user');
                }

                user.usernameToLower = user.username.toLowerCase();

                return data.users.create(user).then(function (resp) {
                    var newUser = resp.ops[0];
                    return res.status(201).json({
                        username: newUser.username
                    });
                });
            });
        },

        put: function put(req, res) {
            var reqUser = req.body;
            return data.users.findOptions({
                usernameToLower: reqUser.username.toLowerCase()
            }).then(function (resultFromDb) {
                var dbUser = resultFromDb[0];
                if (!dbUser || dbUser.passHash !== reqUser.passHash) {
                    return res.status(404).send('Invalid username or password');
                }

                if (!dbUser.hasOwnProperty('authKey')) {
                    dbUser.authKey = generateAuthKey(dbUser._id);
                    return data.users.updateById(dbUser).then(function (u) {
                        return res.status(200).send({
                            result: {
                                username: u.username,
                                authKey: u.authKey,
                                role: u.role
                            }
                        });
                    });
                }

                return res.status(200).send({
                    result: {
                        username: dbUser.username,
                        authKey: dbUser.authKey,
                        role: dbUser.role
                    }
                });
            });
        }
    };
};

module.exports = { init: init };