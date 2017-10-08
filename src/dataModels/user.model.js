class User {
    static isValid(model) {
        return true;
    }

    get id() {
        return this._id;
    }
}

module.exports = User;
