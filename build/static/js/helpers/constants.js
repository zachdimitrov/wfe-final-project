'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ALLOW_CHARS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_.';
var USERNAME_MIN_LENGTH = 3;
var USERNAME_MAX_LENGTH = 30;
var ADMINS = ['admin', 'zach'];
var TITLE_MIN_LENGTH = 3;
var TITLE_MAX_LENGTH = 45;
var ROLE = {
    ADMIN: 'admin',
    REGULAR: 'regular'
};
var ID_LOCAL_STORAGE = 'signed-in-user-id';
var CURRENT_POST = 'current-post-object';
var API_URLS = {
    LOGIN: 'api/users/',
    REGISTER: 'api/users/',
    POSTS: 'api/posts/'
};
var KEY = {
    HTTP_HEADER: 'x-auth-key',
    STORAGE_USERNAME: 'username',
    STORAGE_AUTHKEY: 'authKey',
    ADMINISTRATOR: 'administrator'
};

exports.ALLOW_CHARS = ALLOW_CHARS;
exports.USERNAME_MIN_LENGTH = USERNAME_MIN_LENGTH;
exports.USERNAME_MAX_LENGTH = USERNAME_MAX_LENGTH;
exports.TITLE_MIN_LENGTH = TITLE_MIN_LENGTH;
exports.TITLE_MAX_LENGTH = TITLE_MAX_LENGTH;
exports.ADMINS = ADMINS;
exports.ROLE = ROLE;
exports.KEY = KEY;
exports.ID_LOCAL_STORAGE = ID_LOCAL_STORAGE;
exports.CURRENT_POST = CURRENT_POST;
exports.API_URLS = API_URLS;