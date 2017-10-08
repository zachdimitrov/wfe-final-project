const PostsData = require('./posts.data');
const UsersData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        posts: new PostsData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };
