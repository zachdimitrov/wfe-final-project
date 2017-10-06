/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';

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
                    username: $('#tb-reg-username').val(),
                    password: $('#tb-reg-pass').val(),
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
                    username: $('#tb-reg-username').val(),
                    password: $('#tb-reg-pass').val(),
                    email: $('#tb-reg-mail').val(),
                    role: 'regular',
                };

                data.users.register(user)
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

export {
    all,
    login,
    register,
};
