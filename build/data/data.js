'use strict';

var PostsData = require('./posts.data');
var UsersData = require('./users.data');

var init = function init(db) {
    return Promise.resolve({
        posts: new PostsData(db),
        users: new UsersData(db)
    });
};

module.exports = { init: init };