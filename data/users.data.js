const BaseData = require('./base/base.data');
const User = require('../dataModels/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    checkPassword(username, password) {
        return this.collection
            .findOne({
                username,
            })
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user name');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }
}

module.exports = UsersData;
