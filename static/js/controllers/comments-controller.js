/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';

function add(context, id) {
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
                title: $('#tb-comment-title').val().escape(),
                content: $('#tb-comment-content').val().escape(),
            });
            return post;
        })
        .then((post) => {
            return data.posts.update(id, post);
        })
        .then((p) => {
            toastr.success(`Comment added to "${p.title}"!`);
            setTimeout(() => {
                context.redirect(`#/posts/read/${id}`);
                document.location.reload(true);
            }, 500);
        })
        .catch(function(err) {
            toastr.error(err.message, 'Comment failed!');
        });
}

function toggle(context, id, deleted) {
    const commentId = context.params.commentid;
    console.log(commentId);
       data.posts.getById(id)
            .then((post) => {
                const p = post
                    .comments
                    .find((c) => c.created === commentId);
                p.isDeleted = deleted;
                return post;
            })
            .then((post) => {
                return data.posts.update(id, post);
            })
            .then((p) => {
                toastr.success(`Comment removed!`);
                setTimeout(() => {
                    context.redirect(`#/posts/read/${id}`);
                    document.location.reload(true);
                }, 500);
            })
            .catch(function(err) {
                toastr.error(err.message, 'Failed to delete!');
            });
}

export {
    add,
    toggle,
};
