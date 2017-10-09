'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.posts = exports.users = undefined;

var _requester = require('requester');

var jsonRequester = _interopRequireWildcard(_requester);

var _constants = require('constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* users */

/* globals CryptoJS */
/* eslint-disable new-cap */

function signIn(user) {
    // sign out current user first
    if (hasUser()) {
        cleanSession();
    }

    var reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    var options = {
        data: reqUser
    };

    return jsonRequester.put(_constants.API_URLS.LOGIN, options).then(function (resp) {
        var u = resp.result;
        sessionStorage.setItem(_constants.KEY.STORAGE_USERNAME, u.username);
        sessionStorage.setItem(_constants.KEY.STORAGE_AUTHKEY, u.authKey);
        if (u.role === 'admin') {
            sessionStorage.setItem(_constants.KEY.ADMINISTRATOR, true);
        }
        return u;
    });
}

function signOut() {
    var promise = new Promise(function (resolve, reject) {
        cleanSession();
        resolve();
    });
    return promise;
}

function register(user) {
    var reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString(),
        email: user.email,
        role: user.role
    };

    return jsonRequester.post(_constants.API_URLS.REGISTER, {
        data: reqUser
    }).then(function (resp) {
        var u = resp;
        return {
            username: u.username
        };
    });
}

function hasUser() {
    return !!sessionStorage.getItem(_constants.KEY.STORAGE_USERNAME) && !!sessionStorage.getItem(_constants.KEY.STORAGE_AUTHKEY);
}

function hasAdmin() {
    return hasUser() && !!sessionStorage.getItem(_constants.KEY.ADMINISTRATOR);
}

function cleanSession() {
    sessionStorage.removeItem(_constants.KEY.STORAGE_USERNAME);
    sessionStorage.removeItem(_constants.KEY.STORAGE_AUTHKEY);
    if (sessionStorage.getItem(_constants.KEY.ADMINISTRATOR)) {
        sessionStorage.removeItem(_constants.KEY.ADMINISTRATOR);
    }
}

function authUser() {
    return sessionStorage.getItem(_constants.KEY.STORAGE_USERNAME);
}

/* posts */

function postsGet(page, size) {
    var q = '';

    if (page && page > 0 || size && size > 0) {
        q = '?';
    }

    if (page && page > 0) {
        q += 'page=' + page;
    }

    if (size && size > 0) {
        if (q.length > 1) {
            q += '&';
        }
        q += 'size=' + size;
    }

    return jsonRequester.get(_constants.API_URLS.POSTS + ('?page=' + page + '&size=' + size)).then(function (resp) {
        return resp.result;
    });
}

function postsGetById(id) {
    return jsonRequester.get(_constants.API_URLS.POSTS + id).then(function (resp) {
        return resp.result;
    });
}

function postsAdd(post) {
    var options = {
        data: post,
        headers: {
            'x-auth-key': sessionStorage.getItem(_constants.KEY.STORAGE_AUTHKEY)
        }
    };

    return jsonRequester.post(_constants.API_URLS.POSTS, options).then(function (resp) {
        return resp.result;
    });
}

function postsUpdate(id, post) {
    var options = {
        data: post,
        headers: {
            'x-auth-key': sessionStorage.getItem(_constants.KEY.STORAGE_AUTHKEY)
        }
    };
    return jsonRequester.put(_constants.API_URLS.POSTS + id, options).then(function (resp) {
        return resp.result;
    });
}

var users = {
    signIn: signIn,
    signOut: signOut,
    register: register,
    hasUser: hasUser,
    hasAdmin: hasAdmin,
    authUser: authUser
};

var posts = {
    get: postsGet,
    getById: postsGetById,
    add: postsAdd,
    update: postsUpdate
};

exports.users = users;
exports.posts = posts;