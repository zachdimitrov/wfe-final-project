/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';
import * as pageHelpers from 'page-helpers';

function add(context) {
    const id = context.params.id;
    data.posts.getById(id)
        .then((post) => {
            if (!post.comments) {
                post.comments = [];
            }
            const author = { username: data.users.authUser() };
            post.comments.push({
                isDeleted: false,
                created: Date.now(),
                author: author,
                title: $('#tb-comment-title').val(),
                content: $('#tb-comment-content').val(),
            });
            return post;
        })
        .then((post) => {
            return data.posts.update(id, post);
        })
        .then((p) => {
            toastr.success(`Comment added to "${p.title}"!`);
            setTimeout(() => {
                context.redirect(`#/posts/${id}`);
            }, 500);
        })
        .catch(function(err) {
            toastr.error(err.message, 'Comment failed!');
        });
}

function del(context) {
    const id = context.params.id;
    const commentId = context.params.commentid;
    $('#btn-send-comment-delete').click((ev) => {
        data.posts.getById(id)
            .then((post) => {
                const index = post
                    .comments
                    .findIndex((c) => c._id === commentId);
                post.comments[index].isDeleted = true;
                return post;
            })
            .then((post) => {
                return data.posts.update(id, post);
            })
            .then((p) => {
                toastr.success(`Comment removed!`);
                setTimeout(() => {
                    context.redirect(`#/posts/${id}`);
                }, 500);
            })
            .catch(function(err) {
                toastr.error(err.message, 'Failed to delete!');
            });
    });
}

export {
    add,
    del,
};
