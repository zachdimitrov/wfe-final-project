/* globals System */
/* eslint-disable max-len */

System.config({
    transpiler: 'plugin-babel',
    map: {
        // System.js files
        'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
        'text': 'libs/systemjs-plugin-text/text.js',

        // App files
        'app': 'js/app.js',
        'validator': 'js/helpers/validator.js',
        'constants': 'js/helpers/constants.js',
        'data': 'js/data.js',
        'requester': 'js/requesters/json-requester.js',
        'template-requester': 'js/requesters/template-requester.js',
        'user-model': 'js/models/user.js',
        'post-model': 'js/models/post.js',
        'users-controller': 'js/controllers/users-controller.js',
        'posts-controller': 'js/controllers/posts-controller.js',
        'home-controller': 'js/controllers/home-controller.js',
        'gallery-controller': 'js/controllers/gallery-controller.js',
        'comments-controller': 'js/controllers/comments-controller.js',
        'router': 'js/routing.js',
        'page-helpers': 'js/helpers/page-helpers.js',
        'html-escape': 'js/helpers/html-escape.js',
        'handlebars-helpers': 'js/helpers/handlebars-helpers.js',

        // Library files
        'jquery': 'libs/jquery/dist/jquery.min.js',
        // 'handlebars': 'libs/handlebars/dist/handlebars.min.js',
        // 'cryptojs': 'libs/cryptojs/lib/crypto.js',
        // 'toastr': 'libs/toastr/toastr.js',
        // 'sammy': 'libs/sammy/lib/min/sammy-latest.min.js',
    },
});

System.import('app');
