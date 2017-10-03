const PostsData = require('./posts.data');

const init = (db) => {
    return Promise.resolve({
        posts: new PostsData(db),
    });
};

module.exports = { init };
