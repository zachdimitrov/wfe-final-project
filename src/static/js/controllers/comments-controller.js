/* globals $ toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as validate from 'validator';
import * as CON from 'constants';

function add(context, id) {
    data.posts.getById(id)
        .then((foundPost) => {
            if (!foundPost.comments) {
                foundPost.comments = [];
            }

            return foundPost;
        })
        .then((post) => {
            return _createComment(post);
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
    data.posts.getById(id)
        .then((post) => {
            const p = post
                .comments
                .find((c) => c.created === +commentId);
            p.isDeleted = deleted;
            return post;
        })
        .then((post) => {
            return data.posts.update(id, post);
        })
        .then((p) => {
            const r = 'deleted';
            const s = 'restored';
            toastr.success(`Comment ${deleted?r:s}!`);
            setTimeout(() => {
                context.redirect(`#/posts/read/${id}`);
                document.location.reload(true);
            }, 500);
        })
        .catch(function(err) {
            toastr.error(err.message, 'Failed to delete!');
        });
}

function _createComment(post) {
    return new Promise((res, rej) => {
        const newPost = post;
        const author = { 'username': data.users.authUser() };

        // validate data, TODO: create model
        const title = validate.text(
            $('#tb-comment-title').val(),
            CON.TITLE_MIN_LENGTH,
            CON.TITLE_MAX_LENGTH);
        const content = validate.text(
            $('#tb-comment-content').val(),
            CON.CONTENT_MIN_LENGTH,
            CON.CONTENT_MAX_LENGTH);

        const comment = {
            author: author,
            created: Date.now(),
            isDeleted: false,
            title: title.escape() || 'No title',
            content: content.escape(),
        };

        newPost.comments.push(comment);
        res(newPost);
    });
}

export {
    add,
    toggle,
};
