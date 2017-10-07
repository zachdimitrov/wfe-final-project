/* globals $ Sammy toastr */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */

import * as data from 'data';
import * as postsController from 'posts-controller';
import * as usersController from 'users-controller';
import * as homeController from 'home-controller';
import * as hbHelpers from 'handlebars-helpers';
import * as pageHelpers from 'page-helpers';

const sammyApp = new Sammy('#content', function() {
    this.get('#/', (ctx) => homeController.all(ctx, 'home'));
    this.get('#/contacts', (ctx) => homeController.all(ctx, 'contacts'));
    this.get('#/posts', postsController.all);
    this.get('#/posts/all/:category', postsController.category);
    this.get('#/posts/add', postsController.add);
    this.get('#/posts/read/:id', postsController.read);
    this.get('#/users/login', usersController.login);
    this.get('#/users/signup', usersController.register);
    this.get('#/users/profile/:id', usersController.profile);
});

$(function() {
    hbHelpers.init();
    pageHelpers.hamburger();

    sammyApp.run('#/');

    if (data.users.hasUser()) {
        $('#btn-login').hide();
        $('#btn-signup').hide();
        $('#btn-logout').show();
    } else {
        $('#btn-logout').hide();
        $('#btn-signup').show();
        $('#btn-login').show();
    }

    $('#btn-logout').on('click', function(e) {
        e.preventDefault();
        data.users.signOut()
            .then(function() {
                toastr.success('Signed out successfully.', 'Good bye!');
                $('#btn-logout').hide();
                $('#btn-signup').show();
                $('#btn-login').show();
                document.location = '#/';
            });
    });
});
