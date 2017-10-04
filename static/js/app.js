/* globals $ */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */

import * as data from 'data';
import * as postsController from 'postsController';
import * as usersController from 'usersController';
import * as homeController from 'homeController';
import { Sammy } from 'sammy';
import { toastr } from 'toastsr';

const sammyApp = $.sammy('#content', function() {
    this.get('#/', homeController.all);
    this.get('#/posts', postsController.all);
    this.get('#/posts/add', postsController.add);
    this.get('#/users', usersController.all);
    this.get('#/users/register', usersController.register);
});

$(function() {
    sammyApp.run('#/user');

    if (data.users.hasUser()) {
        $('#container-sign-in').addClass('hidden');
        $('#btn-sign-out').on('click', function(e) {
            e.preventDefault();
            data.users.signOut()
                .then(function() {
                    document.location = '#/';
                    document.location.reload(true);
                });
        });
    } else {
        $('#container-sign-out').addClass('hidden');
        $('#btn-sign-in').on('click', function(e) {
            e.preventDefault();
            const user = {
                username: $('#tb-username').val(),
                password: $('#tb-password').val(),
            };
            data.users.signIn(user)
                .then((u) => {
                    document.location = '#/';
                    document.location.reload(true);
                }, (err) => {
                    $('#container-sign-in').trigger('reset');
                    toastr.error(err.responseText);
                });
        });
    }
});
