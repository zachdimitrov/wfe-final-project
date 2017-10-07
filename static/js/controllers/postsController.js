/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';
import * as pageHelpers from 'page-helpers';

function all(context) {
    let posts;
    const user = data.users.authUser();
    const admin = data.users.hasAdmin();
    data.posts.get()
        .then(function(resPosts) {
            posts = resPosts
                .sort((a, b) => Date.parse(a.created) < Date.parse(b.created));
            return templates.get('posts-all');
        })
        .then(function(template) {
            const ctx = { admin, user, posts };
            context.$element().html(template(ctx));
        })
        .catch(function(err) {
            toastr.error(err.message, 'No posts found!');
        });
}

function read(context) {
    const id = context.params.id;
    const user = data.users.authUser();
    let posts = [];
    let post = {};
    let ctx = {};
    data.posts.get()
        .then(function(resPosts) {
            posts = resPosts
                .sort((a, b) => Date.parse(a.created) < Date.parse(b.created));
            post = posts.find((p) => p._id === id);
            ctx = { user, posts, post };
            return templates.get('posts-single');
        })
        .then(function(template) {
            context.$element().html(template(ctx));
            pageHelpers.zoomin();
        })
        .catch(function(err) {
            toastr.error(err.message, 'No posts found!');
        });
}

function add(context) {
    return templates.get('posts-add')
        .then(function(template) {
            return context.$element()
                .html(template());
        })
        .then(() => {
            $('#btn-send-post-add').on('click', function() {
                const author = { 'username': data.users.authUser() };
                const post = {
                    author: author,
                    category: $('#tb-post-category').val(),
                    title: $('#tb-post-title').val(),
                    content: $('#tb-post-content').val(),
                    imageUrl: $('#tb-post-imageurl').val(),
                };
                return data.posts.add(post)
                    .then((p) => {
                        toastr.success(`Post "${p.title}" added!`);
                        setTimeout(() => {
                            context.redirect('#/posts');
                        }, 500);
                    })
                    .catch(function(err) {
                        toastr.error(err.message, 'No post created!');
                    });
            });
        });
}

export {
    all,
    add,
    read,
};
