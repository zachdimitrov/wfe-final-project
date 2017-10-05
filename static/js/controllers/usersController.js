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

            $('#btn-continue').on('click', function() {
                const user = {
                    username: $('#tb-reg-username').val(),
                    password: $('#tb-reg-pass').val(),
                };

                data.users.signIn(user)
                    .then(function() {
                        toastr.success(`Hello, ${user.username}!`);
                        context.redirect('#/');
                        document.location.reload(true);
                    });
            });
        });
}

function register(context) {
    templates.get('signup')
        .then(function(template) {
            context.$element().html(template());

            $('#btn-signup').on('click', function() {
                const user = {
                    username: $('#tb-reg-username').val(),
                    password: $('#tb-reg-pass').val(),
                };

                data.users.register(user)
                    .then(function() {
                        toastr.success('User registered!');
                        context.redirect('#/');
                        document.location.reload(true);
                    });
            });
        });
}

export {
    all,
    login,
    register,
};
