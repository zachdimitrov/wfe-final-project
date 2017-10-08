/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';
import * as pageHelpers from 'page-helpers';
import * as commentsController from 'comments-controller';

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
            const ctx = { admin, user, posts, cat: '' };
            context.$element().html(template(ctx));
        })
        .catch(function(err) {
            toastr.error(err.message, 'No posts found!');
        });
}

function category(context) {
    let cat = context.params.category;
    let posts;
    const user = data.users.authUser();
    const admin = data.users.hasAdmin();
    data.posts.get()
        .then(function(resPosts) {
            posts = resPosts
                .filter((p) => p.category.toLowerCase() === cat.toLowerCase())
                .sort((a, b) => Date.parse(a.created) < Date.parse(b.created));
            return templates.get('posts-all');
        })
        .then(function(template) {
            if (posts) {
                cat = posts[0].category;
            } else {
                cat = 'No posts';
            }

            const ctx = { admin, user, posts, cat };
            context.$element().html(template(ctx));
        })
        .catch(function(err) {
            toastr.error(err.message, 'No posts found!');
        });
}

function read(context) {
    const id = context.params.id;
    const user = data.users.authUser();
    const admin = data.users.hasAdmin();
    let posts = [];
    let post = {};
    let ctx = {};
    data.posts.get()
        .then(function(resPosts) {
            posts = resPosts
                .sort((a, b) => Date.parse(a.created) < Date.parse(b.created));
            post = posts.find((p) => p._id === id);
            ctx = { admin, user, posts, post };
            return templates.get('posts-single');
        })
        .then(function(template) {
            context.$element().html(template(ctx));
            pageHelpers.zoomin();
            $('#btn-send-comment-add').click((ev) => {
                commentsController.add(context, id);
            });
            let iid;
            $('.btn-send-comment-delete').click((ev) => {
                iid = $(ev.target).attr('addr');
                context.params.commentid = iid;
                commentsController.toggle(context, id, true);
            });
            $('.btn-send-comment-restore').click((ev) => {
                iid = $(ev.target).attr('addr');
                context.params.commentid = iid;
                commentsController.toggle(context, id, false);
            });
        })
        .catch(function(err) {
            toastr.error(err.message, 'No posts found!');
        });
}

function add(context) {
    const admin = data.users.hasAdmin();
    if (!admin) {
        toastr.error('You are not admin!', 'Access denied!');
        setTimeout(() => {
            context.redirect('#/posts');
        }, 500);
        return false;
    }

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
                    created: Date.now(),
                    isDeleted: false,
                    category: $('#tb-post-category').val(),
                    title: $('#tb-post-title').val().escape(),
                    content: $('#tb-post-content').val().escape(),
                    imageUrl: $('#tb-post-imageurl').val().escape(),
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
    category,
};
