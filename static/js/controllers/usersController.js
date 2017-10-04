/* globals $ */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';
import { toastr } from 'toastsr';

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

function register(context) {
    templates.get('register')
        .then(function(template) {
            context.$element().html(template());

            $('#btn-register').on('click', function() {
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

const usersController = {
    all: all,
    register: register,
};

export { usersController };
