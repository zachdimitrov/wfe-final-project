'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.category = exports.read = exports.add = exports.all = undefined;

var _data = require('data');

var data = _interopRequireWildcard(_data);

var _templateRequester = require('template-requester');

var templates = _interopRequireWildcard(_templateRequester);

var _pageHelpers = require('page-helpers');

var pageHelpers = _interopRequireWildcard(_pageHelpers);

var _commentsController = require('comments-controller');

var commentsController = _interopRequireWildcard(_commentsController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* globals $ toastr */
/* eslint-disable no-invalid-this */

function all(context) {
    var posts = void 0;
    var user = data.users.authUser();
    var admin = data.users.hasAdmin();
    data.posts.get().then(function (resPosts) {
        posts = resPosts.sort(function (a, b) {
            return Date.parse(a.created) < Date.parse(b.created);
        });
        return templates.get('posts-all');
    }).then(function (template) {
        var ctx = { admin: admin, user: user, posts: posts, cat: '' };
        context.$element().html(template(ctx));
    }).catch(function (err) {
        toastr.error(err.message, 'No posts found!');
    });
}

function category(context) {
    var cat = context.params.category;
    var posts = void 0;
    var user = data.users.authUser();
    var admin = data.users.hasAdmin();
    data.posts.get().then(function (resPosts) {
        posts = resPosts.filter(function (p) {
            return p.category.toLowerCase() === cat.toLowerCase();
        }).sort(function (a, b) {
            return Date.parse(a.created) < Date.parse(b.created);
        });
        return templates.get('posts-all');
    }).then(function (template) {
        if (posts) {
            cat = posts[0].category;
        } else {
            cat = 'No posts';
        }

        var ctx = { admin: admin, user: user, posts: posts, cat: cat };
        context.$element().html(template(ctx));
    }).catch(function (err) {
        toastr.error(err.message, 'No posts found!');
    });
}

function read(context) {
    var id = context.params.id;
    var user = data.users.authUser();
    var admin = data.users.hasAdmin();
    var posts = [];
    var post = {};
    var ctx = {};
    data.posts.get().then(function (resPosts) {
        posts = resPosts.sort(function (a, b) {
            return Date.parse(a.created) < Date.parse(b.created);
        });
        post = posts.find(function (p) {
            return p._id === id;
        });
        ctx = { admin: admin, user: user, posts: posts, post: post };
        return templates.get('posts-single');
    }).then(function (template) {
        context.$element().html(template(ctx));
        pageHelpers.zoomin();
        $('#btn-send-comment-add').click(function (ev) {
            commentsController.add(context, id);
        });
        $('.btn-send-comment-delete').click(function (ev) {
            context.params.commentid = $(ev.target).attr('addr');
            commentsController.toggle(context, id, true);
        });
        $('.btn-send-comment-restore').click(function (ev) {
            context.params.commentid = $(ev.target).attr('addr');
            commentsController.toggle(context, id, false);
        });
    }).catch(function (err) {
        toastr.error(err.message, 'No posts found!');
    });
}

function add(context) {
    var admin = data.users.hasAdmin();
    if (!admin) {
        toastr.error('You are not admin!', 'Access denied!');
        setTimeout(function () {
            context.redirect('#/posts');
        }, 500);
        return false;
    }

    return templates.get('posts-add').then(function (template) {
        return context.$element().html(template());
    }).then(function () {
        $('#btn-send-post-add').on('click', function () {
            var author = { 'username': data.users.authUser() };
            var post = {
                author: author,
                created: Date.now(),
                isDeleted: false,
                category: $('#tb-post-category').val(),
                title: $('#tb-post-title').val().escape() || 'No title',
                content: $('#tb-post-content').val().escape(),
                imageUrl: $('#tb-post-imageurl').val().escape()
            };
            return data.posts.add(post).then(function (p) {
                toastr.success('Post "' + p.title + '" added!');
                setTimeout(function () {
                    context.redirect('#/posts');
                }, 500);
            }).catch(function (err) {
                toastr.error(err.message, 'No post created!');
            });
        });
    });
}

exports.all = all;
exports.add = add;
exports.read = read;
exports.category = category;