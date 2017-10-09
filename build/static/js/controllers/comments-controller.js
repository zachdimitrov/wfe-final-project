'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggle = exports.add = undefined;

var _data = require('data');

var data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function add(context, id) {
    data.posts.getById(id).then(function (post) {
        if (!post.comments) {
            post.comments = [];
        }
        var author = { username: data.users.authUser() };
        post.comments.push({
            isDeleted: false,
            created: Date.now(),
            author: author,
            title: $('#tb-comment-title').val().escape(),
            content: $('#tb-comment-content').val().escape()
        });
        return post;
    }).then(function (post) {
        return data.posts.update(id, post);
    }).then(function (p) {
        toastr.success('Comment added to "' + p.title + '"!');
        setTimeout(function () {
            context.redirect('#/posts/read/' + id);
            document.location.reload(true);
        }, 500);
    }).catch(function (err) {
        toastr.error(err.message, 'Comment failed!');
    });
} /* globals $ toastr */
/* eslint-disable no-invalid-this */

function toggle(context, id, deleted) {
    var commentId = context.params.commentid;
    data.posts.getById(id).then(function (post) {
        var p = post.comments.find(function (c) {
            return c.created === +commentId;
        });
        p.isDeleted = deleted;
        return post;
    }).then(function (post) {
        return data.posts.update(id, post);
    }).then(function (p) {
        var r = 'deleted';
        var s = 'restored';
        toastr.success('Comment ' + (deleted ? r : s) + '!');
        setTimeout(function () {
            context.redirect('#/posts/read/' + id);
            document.location.reload(true);
        }, 500);
    }).catch(function (err) {
        toastr.error(err.message, 'Failed to delete!');
    });
}

exports.add = add;
exports.toggle = toggle;