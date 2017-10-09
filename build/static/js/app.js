'use strict';

var _data = require('data');

var data = _interopRequireWildcard(_data);

var _postsController = require('posts-controller');

var postsController = _interopRequireWildcard(_postsController);

var _usersController = require('users-controller');

var usersController = _interopRequireWildcard(_usersController);

var _homeController = require('home-controller');

var homeController = _interopRequireWildcard(_homeController);

var _galleryController = require('gallery-controller');

var galleryController = _interopRequireWildcard(_galleryController);

var _handlebarsHelpers = require('handlebars-helpers');

var hbHelpers = _interopRequireWildcard(_handlebarsHelpers);

var _pageHelpers = require('page-helpers');

var pageHelpers = _interopRequireWildcard(_pageHelpers);

var _htmlEscape = require('html-escape');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* globals $ Sammy toastr */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */

var sammyApp = new Sammy('#content', function () {
    this.get('#/', function (ctx) {
        return homeController.all(ctx, 'home');
    });
    this.get('#/contacts', function (ctx) {
        return homeController.all(ctx, 'contacts');
    });
    this.get('#/gallery/:size', galleryController.all);
    this.get('#/posts', postsController.all);
    this.get('#/posts/all/:category', postsController.category);
    this.get('#/posts/add', postsController.add);
    this.get('#/posts/read/:id', postsController.read);
    this.get('#/users/login', usersController.login);
    this.get('#/users/signup', usersController.register);
    this.get('#/users/profile', usersController.account);
    this.get('#/users/comments/:username', usersController.userComments);
});

$(function () {
    hbHelpers.init();
    pageHelpers.hamburger();
    (0, _htmlEscape.addEscape)();

    sammyApp.run('#/');

    if (data.users.hasUser()) {
        $('#btn-login').hide();
        $('#btn-signup').hide();
        $('#btn-account').show();
    } else {
        $('#btn-account').hide();
        $('#btn-signup').show();
        $('#btn-login').show();
    }

    $('#btn-logout').on('click', function (e) {
        e.preventDefault();
        data.users.signOut().then(function () {
            toastr.success('Signed out successfully.', 'Good bye!');
            $('#btn-account').hide();
            $('#btn-signup').show();
            $('#btn-login').show();
            document.location = '#/';
        });
    });
});