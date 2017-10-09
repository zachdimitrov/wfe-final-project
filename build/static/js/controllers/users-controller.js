'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.account = exports.userComments = exports.register = exports.login = exports.all = undefined;

var _data = require('data');

var data = _interopRequireWildcard(_data);

var _templateRequester = require('template-requester');

var templates = _interopRequireWildcard(_templateRequester);

var _commentsController = require('comments-controller');

var commentsController = _interopRequireWildcard(_commentsController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function all(context) {
    var users = void 0;
    data.users.get().then(function (resUsers) {
        users = resUsers;
        return templates.get('users');
    }).then(function (template) {
        context.$element().html(template(users));
    });
} /* globals $ toastr */
/* eslint-disable no-invalid-this */

function login(context) {
    templates.get('login').then(function (template) {
        context.$element().html(template());

        $('#btn-send-login').on('click', function () {
            var user = {
                username: $('#tb-reg-username').val().escape(),
                password: $('#tb-reg-pass').val().escape()
            };
            data.users.signIn(user).then(function () {
                toastr.success('Hello, ' + user.username + '!');
                $('#btn-login').hide();
                $('#btn-signup').hide();
                $('#btn-account').show();
                setTimeout(function () {
                    context.redirect('#/');
                }, 500);
            }).catch(function (err) {
                toastr.error(err, 'Sorry, login failed!');
            });
        });
    });
}

function register(context) {
    templates.get('signup').then(function (template) {
        context.$element().html(template());

        $('#btn-send-signup').on('click', function () {
            var user = {
                username: $('#tb-reg-username').val().escape(),
                password: $('#tb-reg-pass').val().escape(),
                email: $('#tb-reg-mail').val().escape(),
                role: 'regular'
            };

            return data.users.register(user).then(function (u) {
                toastr.success('User ' + u.username + ' registered!');
                setTimeout(function () {
                    context.redirect('#/users/login');
                }, 500);
            }).catch(function (err) {
                toastr.error(err.message, 'Sorry sign up failed!');
            });
        });
    });
}

function account(context) {
    var user = data.users.authUser();
    templates.get('account').then(function (template) {
        context.$element().html(template({ user: user }));
    });
}

function userComments(context) {
    var admin = data.users.hasAdmin();
    var user = context.params.username;
    var comments = [];

    return data.posts.get().then(function (posts) {
        posts.forEach(function (p) {
            if (p.comments) {
                var id = p._id;
                var filtered = p.comments.filter(function (x) {
                    return x.author.username === user;
                });
                if (filtered.length > 0) {
                    filtered.forEach(function (f) {
                        comments.push({ f: f, id: id });
                    });
                }
            }
        });

        return Promise.resolve(comments);
    }).then(function () {
        return templates.get('user-comments');
    }).then(function (template) {
        context.$element().html(template({ admin: admin, user: user, comments: comments }));
        var id = void 0;
        $('.btn-send-comment-delete').click(function (ev) {
            context.params.commentid = $(ev.target).attr('addr');
            id = $(ev.target).attr('parr');
            commentsController.toggle(context, id, true);
        });
        $('.btn-send-comment-restore').click(function (ev) {
            context.params.commentid = $(ev.target).attr('addr');
            id = $(ev.target).attr('parr');
            commentsController.toggle(context, id, false);
        });
    });
}

exports.all = all;
exports.login = login;
exports.register = register;
exports.userComments = userComments;
exports.account = account;