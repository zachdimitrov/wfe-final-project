class Post {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.title === 'string' &&
            typeof model.author === 'string' &&
            typeof model.content === 'string';
    }
}

module.exports = Post;
