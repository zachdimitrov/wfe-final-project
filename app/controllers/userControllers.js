const init = (data) => {
    const AUTH_KEY_LENGTH = 60;
    const AUTH_KEY_CHARS =
        'qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM';

    function generateAuthKey(uniquePart) {
        const authKey = uniquePart;
        let index;

        while (authKey.length < AUTH_KEY_LENGTH) {
            index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
            authKey += AUTH_KEY_CHARS[index];
        }

        return authKey;
    }

    return {
        get: (req, res) => {
            const user = req.user;
            if (!user) {
                return res.status(401)
                    .send('Unauthorized user!');
            }

            return data.users.findOptions({
                    username: user.username,
                    _id: user.id,
                })
                .then((u) => {
                    return res.send({
                        result: u,
                    });
                });
        },

        post: (req, res) => {
            const user = req.body;
            if (!user ||
                typeof user.username !== 'string' ||
                typeof user.passHash !== 'string') {
                return res.status(400)
                    .send('Invalid user');
            }

            return data.users.findOptions({
                    usernameToLower: user.username.toLowerCase(),
                })
                .then((dbUser) => {
                    if (dbUser) {
                        return res.status(400)
                            .send('Duplicated user');
                    }

                    user.usernameToLower = user.username.toLowerCase();

                    return data.users.create(user)
                        .then((newUser) => {
                            return res.status(201)
                                .send({
                                    result: {
                                        username: user.username,
                                    },
                                });
                        });
                });
        },

        put: (req, res) => {
            const reqUser = req.body;
            return data.users.findOptions({
                    usernameToLower: reqUser.username.toLowerCase(),
                })
                .then((dbUser) => {
                    if (!dbUser || dbUser.passHash !== reqUser.passHash) {
                        return res.status(404)
                            .send('Invalid username or password');
                    }

                    if (!dbUser.authKey) {
                        dbUser.authKey = generateAuthKey(dbUser.id);
                        return data.users.updateById(dbUser)
                            .then((u) => {
                                return res.send({
                                    result: {
                                        username: u.username,
                                        authKey: u.authKey,
                                    },
                                });
                            });
                    }

                    return res.send({
                        result: {
                            username: dbUser.username,
                            authKey: dbUser.authKey,
                        },
                    });
                });
        },
    };
};

module.exports = { init };
