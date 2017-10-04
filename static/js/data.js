import * as requester from 'requester';

import {
    KEY,
    API_URLS,
} from 'constants';

/* Users */

const data = {
    posts() {
        return requester.getJSON(API_URLS.posts);
    },
    addPost(post) {
        const options = {
            headers: {
                [KEY.HTTP_HEADER]: localStorage.getItem(KEY.STORAGE_AUTH),
            },
        };

        return requester.post(API_URLS.posts, post, options);
    },
    editPost(id, type) {
        const options = {
            headers: {
                [KEY.HTTP_HEADER]: localStorage.getItem(KEY.STORAGE_AUTH),
            },
        };

        return requester.post(API_URLS.posts + id, { type }, options);
    },
    login(user) {
        return requester.put(API_URLS.userLogin, user)
            .then((respUser) => {
                localStorage
                    .setItem(KEY.STORAGE_USERNAME, respUser.result.username);
                localStorage
                    .setItem(KEY.STORAGE_AUTH, respUser.result.authKey);
            });
    },
    register(user) {
        return requester.post(API_URLS.userRegister, user);
    },
    logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem(KEY.STORAGE_USERNAME);
                localStorage.removeItem(KEY.STORAGE_AUTH);
            });
    },
    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem(KEY.STORAGE_USERNAME);
            });
    },
};

export {
    data,
};
