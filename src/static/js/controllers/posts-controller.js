/* globals $ toastr */
/* eslint-disable no-invalid-this */
/* eslint-disable no-alert */

import * as data from 'data';
import * as templates from 'template-requester';
import * as pageHelpers from 'page-helpers';
import * as commentsController from 'comments-controller';
import * as validate from 'validator';
import * as CON from 'constants';

function all(context) {
    let posts;
    const user = data.users.authUser();
    const admin = data.users.hasAdmin();
    data.posts.get()
        .then((resPosts) => {
            posts = resPosts
                .sort((a, b) => Date.parse(a.created) < Date.parse(b.created));
            return templates.get('posts-all');
        })
        .then((template) => {
            const ctx = { admin, user, posts, cat: '' };
            context.$element().html(template(ctx));
        })
        .catch((err) => {
            toastr.error(err.message, 'No posts found!');
        });
}

function category(context) {
    let cat = context.params.category;
    let posts;
    const user = data.users.authUser();
    const admin = data.users.hasAdmin();
    data.posts.get()
        .then((resPosts) => {
            posts = resPosts
                .filter((p) => p.category.toLowerCase() === cat.toLowerCase())
                .sort((a, b) => Date.parse(a.created) < Date.parse(b.created));
            return templates.get('posts-all');
        })
        .then((template) => {
            if (posts) {
                cat = posts[0].category;
            } else {
                cat = 'No posts';
            }

            const ctx = { admin, user, posts, cat };
            context.$element().html(template(ctx));
        })
        .catch((err) => {
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
        .then((resPosts) => {
            posts = resPosts
                .sort((a, b) => Date.parse(a.created) < Date.parse(b.created));
            post = posts.find((p) => p._id === id);
            ctx = { admin, user, posts, post };
            return templates.get('posts-single');
        })
        .then((template) => {
            context.$element().html(template(ctx));
            pageHelpers.zoomin();
            $('#btn-send-comment-add').click((ev) => {
                commentsController.add(context, id);
            });
            $('.btn-send-comment-delete').click((ev) => {
                const result = window.confirm('Are you sure?');
                if (result === false) {
                    ev.preventDefault();
                    return;
                }
                context.params.commentid = $(ev.target).attr('addr');
                commentsController.toggle(context, id, true);
            });
            $('.btn-send-comment-restore').click((ev) => {
                context.params.commentid = $(ev.target).attr('addr');
                commentsController.toggle(context, id, false);
            });
            $('#btn-send-post-edit').click((ev) => {
                edit(context, post);
            });
            $('#btn-send-post-delete').click((ev) => {
                const result = window.confirm('Are you sure?');
                if (result === false) {
                    ev.preventDefault();
                    return;
                }
                del(context, post);
            });
        })
        .catch((err) => {
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
        .then((template) => {
            return context.$element()
                .html(template());
        })
        .then(() => {
            $('#btn-send-post-add').on('click', () => {
                return _createPost()
                    .then((newPost) => data.posts.add(newPost))
                    .then((p) => {
                        toastr.success(`Post "${p.title}" added!`);
                        setTimeout(() => {
                            context.redirect('#/posts');
                        }, 500);
                    })
                    .catch((err) => {
                        toastr.error(err.message, 'No post created!');
                        return;
                    });
            });
        })
        .catch((err) => {
            toastr.error(err.message, 'No post created!');
        });
}

function edit(context, post) {
    const admin = data.users.hasAdmin();

    if (!admin) {
        toastr.error('You are not admin!', 'Access denied!');
        setTimeout(() => {
            context.redirect('#/posts');
        }, 500);
        return false;
    }

    return templates.get('posts-add')
        .then((template) => {
            return context.$element()
                .html(template());
        })
        .then(() => {
            $('#tb-post-category').val(post.category);
            $('#tb-post-title').val(post.title);
            $('#tb-post-content').val(post.content);
            $('#tb-post-imageurl').val(post.imageUrl);

            $('#btn-send-post-add')
                .html('Edit post')
                .attr('id', 'btn-send-post-edit');

            $('#btn-send-post-edit').on('click', () => {
                return _createPost()
                    .then((newPost) => data.posts.update(post._id, newPost))
                    .then((p) => {
                        toastr.success(`Post updated!`);
                        setTimeout(() => {
                            context.redirect('#/posts');
                        }, 500);
                    })
                    .catch((err) => {
                        toastr.error(err.message, 'Post was not updated!');
                        return;
                    });
            });
        })
        .catch((err) => {
            toastr.error(err.message, 'Post was not updated!');
        });
}

function del(context, post) {
    const newPost = post;
    newPost.isDeleted = true;

    return data.posts.update(post._id, newPost)
        .then((p) => {
            toastr.success(`Post "${p.title}" removed!`);
            setTimeout(() => {
                context.redirect('#/posts');
            }, 500);
        })
        .catch((err) => {
            toastr.error(err.message, 'Post was not removed!');
        });
}

function _createPost() {
    return new Promise((res, rej) => {
        const author = { 'username': data.users.authUser() };

        // validate data, TODO: create model
        const title = validate.text(
            $('#tb-post-title').val(),
            CON.TITLE_MIN_LENGTH,
            CON.TITLE_MAX_LENGTH);
        const content = validate.text(
            $('#tb-post-content').val(),
            CON.CONTENT_MIN_LENGTH,
            CON.CONTENT_MAX_LENGTH);
        const imageUrl = validate.link($('#tb-post-imageurl').val());

        const post = {
            author: author,
            created: Date.now(),
            isDeleted: false,
            category: $('#tb-post-category').val(),
            title: title.escape() || 'No title',
            content: content.escape(),
            imageUrl: imageUrl.escape() || '../../images/no-image.jpg',
        };
        res(post);
    });
}

export {
    all,
    add,
    read,
    edit,
    category,
};
