const BaseData = require('./base/base.data');
const Post = require('../dataModels/post.model');

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post, Post); // db, class, validator
    }
}

module.exports = PostsData;
