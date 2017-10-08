/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';
import * as commentsController from 'comments-controller';

function all(context) {
    let users;
    data.users.get()
        .then((resUsers) => {
            users = resUsers;
            return templates.get('users');
        })
        .then((template) => {
            context.$element().html(template(users));
        });
}

function login(context) {
    templates.get('login')
        .then((template) => {
            context.$element().html(template());

            $('#btn-send-login').on('click', () => {
                const user = {
                    username: $('#tb-reg-username').val().escape(),
                    password: $('#tb-reg-pass').val().escape(),
                };
                data.users.signIn(user)
                    .then(() => {
                        toastr.success(`Hello, ${user.username}!`);
                        $('#btn-login').hide();
                        $('#btn-signup').hide();
                        $('#btn-logout').show();
                        setTimeout(() => {
                            context.redirect('#/');
                        }, 500);
                    })
                    .catch((err) => {
                        toastr.error(err, 'Sorry, login failed!');
                    });
            });
        });
}

function register(context) {
    templates.get('signup')
        .then((template) => {
            context.$element().html(template());

            $('#btn-send-signup').on('click', () => {
                const user = {
                    username: $('#tb-reg-username').val().escape(),
                    password: $('#tb-reg-pass').val().escape(),
                    email: $('#tb-reg-mail').val().escape(),
                    role: 'regular',
                };

                return data.users.register(user)
                    .then((u) => {
                        toastr.success(`User ${u.username} registered!`);
                        setTimeout(() => {
                            context.redirect('#/users/login');
                        }, 500);
                    })
                    .catch((err) => {
                        toastr.error(err.message, 'Sorry sign up failed!');
                    });
            });
        });
}

function account(context) {
    const user = data.users.authUser();
    templates.get('account')
    .then((template) => {
        context.$element().html(template({ user }));
    });
}

function userComments(context) {
    const admin = data.users.hasAdmin();
    const user = context.params.username;
    const comments = [];

    return data.posts.get()
    .then((posts) => {
        posts.forEach((p) => {
            if (p.comments) {
                const id = p._id;
                const filtered = p.comments
                .filter((x) => x.author.username === user);
                if (filtered.length > 0) {
                    filtered.forEach((f) => {
                        comments.push({ f, id });
                    });
                }
            }
        });

        return Promise.resolve(comments);
    })
    .then(() => {
        return templates.get('user-comments');
    })
    .then((template) => {
        context.$element().html(template({ admin, user, comments }));
        let id;
        $('.btn-send-comment-delete').click((ev) => {
            context.params.commentid = $(ev.target).attr('addr');
            id = $(ev.target).attr('parr');
            commentsController.toggle(context, id, true);
        });
        $('.btn-send-comment-restore').click((ev) => {
            context.params.commentid = $(ev.target).attr('addr');
            id = $(ev.target).attr('parr');
            commentsController.toggle(context, id, false);
        });
    });
}

export {
    all,
    login,
    register,
    userComments,
    account,
};
