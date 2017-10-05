/* globals $ Sammy */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */

import * as data from 'data';
import * as postsController from 'postsController';
import * as usersController from 'usersController';
import * as homeController from 'homeController';
import * as hbHelpers from 'handlebars-helpers';

const sammyApp = new Sammy('#content', function() {
    this.get('#/', homeController.all);
    this.get('#/posts', postsController.all);
    this.get('#/posts/add', postsController.add);
    this.get('#/users/login', usersController.login);
    this.get('#/users/signup', usersController.register);
});

$(function() {
    hbHelpers.init();

    sammyApp.run('#/');

    if (data.users.hasUser()) {
        $('#btn-login').hide();
        $('#btn-signup').hide();
        $('#btn-logout').show();
        $('#btn-logout').on('click', function(e) {
            e.preventDefault();
            data.users.signOut()
                .then(function() {
                    document.location = '#/';
                    document.location.reload(true);
                });
        });
    } else {
        $('#btn-logout').hide();
        $('#btn-signup').show();
        $('#btn-login').show();
    }
});
