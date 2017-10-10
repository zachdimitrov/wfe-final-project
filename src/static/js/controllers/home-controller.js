/* globals toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';
import * as pageHelpers from 'page-helpers';

function all(context, tpl) {
    const user = data.users.authUser();
    let posts;
    data.posts.get()
        .then(function(resPosts) {
            posts = resPosts
                .filter((p) => p.imageUrl.indexOf('../../') < 0 &&
                    !p.isDeleted)
                .slice(0, 7);
            posts.sort((a, b) => b.created - a.created);
            return templates.get(tpl);
        })
        .then(function(template) {
            context.$element().html(template({ posts, user }));
            pageHelpers.zoomin();
            pageHelpers.slides();
        })
        .catch(function(err) {
            toastr.error(err.message, 'Something very bad happened');
        });
}

export { all };
