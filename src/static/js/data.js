/* globals CryptoJS */
/* eslint-disable new-cap */

import * as jsonRequester from 'requester';
import {
    KEY,
    API_URLS,
} from 'constants';

/* users */

function signIn(user) {
    // sign out current user first
    if (hasUser()) {
        cleanSession();
    }

    const reqUser = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString(),
    };

    const options = {
        data: reqUser,
    };

    return jsonRequester.put(API_URLS.LOGIN, options)
        .then((resp) => {
            const u = resp.result;
            sessionStorage.setItem(KEY.STORAGE_USERNAME, u.username);
            sessionStorage.setItem(KEY.STORAGE_AUTHKEY, u.authKey);
            if (u.role === 'admin') {
                sessionStorage.setItem(KEY.ADMINISTRATOR, true);
            }
            return u;
        });
}

function signOut() {
    const promise = new Promise(function(resolve, reject) {
        cleanSession();
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
        .then((resp) => {
            const u = resp;
            return {
                username: u.username,
            };
        });
}

function hasUser() {
    return !!sessionStorage.getItem(KEY.STORAGE_USERNAME) &&
        !!sessionStorage.getItem(KEY.STORAGE_AUTHKEY);
}

function hasAdmin() {
    return hasUser() && !!sessionStorage.getItem(KEY.ADMINISTRATOR);
}

function cleanSession() {
    sessionStorage.removeItem(KEY.STORAGE_USERNAME);
    sessionStorage.removeItem(KEY.STORAGE_AUTHKEY);
    if (sessionStorage.getItem(KEY.ADMINISTRATOR)) {
        sessionStorage.removeItem(KEY.ADMINISTRATOR);
    }
}

function authUser() {
    return sessionStorage.getItem(KEY.STORAGE_USERNAME);
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
        .then((resp) => {
            return resp.result;
        });
}

function postsGetById(id) {
    return jsonRequester.get(API_URLS.POSTS + id)
        .then((resp) => {
            return resp.result;
        });
}

function postsAdd(post) {
    const options = {
        data: post,
        headers: {
            'x-auth-key': sessionStorage.getItem(KEY.STORAGE_AUTHKEY),
        },
    };

    return jsonRequester.post(API_URLS.POSTS, options)
        .then((resp) => {
            return resp.result;
        });
}

function postsUpdate(post) {
    const id = post._id;
        const options = {
        data: post,
        headers: {
            'x-auth-key': sessionStorage.getItem(KEY.STORAGE_AUTHKEY),
        },
    };
    return jsonRequester.put(API_URLS.POSTS + id, options)
        .then((resp) => {
            return resp.result;
        });
}

const users = {
    signIn,
    signOut,
    register,
    hasUser,
    hasAdmin,
    authUser,
};

const posts = {
    get: postsGet,
    getById: postsGetById,
    add: postsAdd,
    update: postsUpdate,
};

export {
    users,
    posts,
};
