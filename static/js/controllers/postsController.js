/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';

function all(context) {
    let posts;
    data.posts.get()
        .then(function(resPosts) {
            posts = resPosts.sort((a, b) => Date.parse(a.created) < Date.parse(b.created));
            return templates.get('posts-all');
        })
        .then(function(template) {
            context.$element().html(template({ posts }));
        })
        .catch(function(err) {
            toastr.error('No posts found!');
        });
}

function add(context) {
    templates.get('posts-add')
        .then(function(template) {
            context.$element()
                .html(template());
            return data.categories.get();
        })
        .then(function(categories) {
            $('#btn-send-post-add').on('click', function() {
                const author = { 'username': data.users.authUser() };
                const post = {
                    author: author,
                    title: $('#tb-post-title').val(),
                    content: $('#tb-post-content').val(),
                    image: $('#tb-post-image').val(),
                };

                data.posts.add(post)
                    .then(function(todo) {
                        toastr.success(`Post "${post.title}" added!`);
                        context.redirect('#/posts');
                    });
            });
        });
}

export {
    all,
    add,
};
