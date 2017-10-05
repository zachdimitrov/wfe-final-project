/* globals CryptoJS */
/* eslint-disable new-cap */

import * as jsonRequester from 'requester';
import {
    KEY,
    API_URLS,
} from 'constants';

/* users */

function signIn(user) {
    const reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString(),
    };

    const options = {
        data: reqUser,
    };

    return jsonRequester.put(API_URLS.LOGIN, options)
        .then(function(resp) {
            const u = resp.result;
            localStorage.setItem(KEY.STORAGE_USERNAME, u.username);
            localStorage.setItem(KEY.STORAGE_AUTHKEY, u.authKey);
            return u;
        });
}

function signOut() {
    const promise = new Promise(function(resolve, reject) {
        localStorage.removeItem(KEY.STORAGE_USERNAME);
        localStorage.removeItem(KEY.STORAGE_AUTHKEY);
        resolve();
    });
    return promise;
}

function register(user) {
    const reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString(),
        email: user.email,
        role: user.role,
    };

    return jsonRequester.post(API_URLS.REGISTER, {
            data: reqUser,
        })
        .then(function(resp) {
            const u = resp.result;
            localStorage.setItem(KEY.STORAGE_USERNAME, u.username);
            localStorage.setItem(KEY.STORAGE_AUTHKEY, u.authKey);
            return {
                username: resp.context.username,
            };
        });
}

function hasUser() {
    return !!localStorage.getItem(KEY.STORAGE_USERNAME) &&
        !!localStorage.getItem(KEY.STORAGE_AUTHKEY);
}

function authUser() {
    return localStorage.getItem(KEY.STORAGE_USERNAME);
}

/* posts */

function postsGet(page, size) {
    let q = '';

    if ((page && page > 0) || (size && size > 0)) {
        q = '?';
    }

    if (page && page > 0) {
        q += `page=${page}`;
    }

    if (size && size > 0) {
        if (q.length > 1) {
            q += '&';
        }
        q += `size=${size}`;
    }

    return jsonRequester.get(API_URLS.POSTS + `?page=${page}&size=${size}`)
        .then(function(res) {
            return res.context;
        });
}

function postsAdd(post) {
    const options = {
        data: post,
        headers: {
            'x-auth-key': localStorage.getItem(KEY.STORAGE_AUTHKEY),
        },
    };

    return jsonRequester.post(API_URLS.POSTS, options)
        .then(function(resp) {
            return resp.context;
        });
}

function postsUpdate(id, post) {
    const options = {
        data: post,
        headers: {
            'x-auth-key': localStorage.getItem(KEY.STORAGE_AUTHKEY),
        },
    };
    return jsonRequester.put('API_URLS.POSTS' + id, options)
        .then(function(resp) {
            return resp.context;
        });
}

const users = {
    signIn,
    signOut,
    register,
    hasUser,
    authUser,
};

const posts = {
    get: postsGet,
    add: postsAdd,
    update: postsUpdate,
};

export {
    users,
    posts,
};
