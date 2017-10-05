/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';

function all(context) {
    let users;
    data.users.get()
        .then(function(resUsers) {
            users = resUsers;
            return templates.get('users');
        })
        .then(function(template) {
            context.$element().html(template(users));
        });
}

function login(context) {
    templates.get('login')
        .then(function(template) {
            context.$element().html(template());

            $('#btn-login').on('click', function() {
                const user = {
                    username: $('#tb-reg-username').val(),
                    password: $('#tb-reg-pass').val(),
                };

                data.users.signIn(user)
                    .then(function() {
                        toastr.success(`Hello, ${user.username}!`);
                        context.redirect('#/');
                        document.location.reload(true);
                    })
                    .catch(function(err) {
                        toastr.error(err.message, 'Sorry, login failed!');
                    });
            });
        });
}

function register(context) {
    templates.get('signup')
        .then(function(template) {
            context.$element().html(template());

            $('#btn-register').on('click', function() {
                const user = {
                    username: $('#tb-reg-username').val(),
                    password: $('#tb-reg-pass').val(),
                    email: $('#tb-reg-mail').val(),
                    role: 'regular',
                };

                data.users.register(user)
                    .then(function(u) {
                        console.log(u);
                        toastr.success(`User ${u.username} registered!`);
                        context.redirect('#/');
                        document.location.reload(true);
                    })
                    .catch(function(err) {
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
