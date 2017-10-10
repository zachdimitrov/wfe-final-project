/* globals toastr */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';
import * as pageHelpers from 'page-helpers';

function all(context) {
    const size = context.params.size;
    let posts;
    data.posts.get()
        .then(function(resPosts) {
            posts = resPosts
                .filter((p) => p.imageUrl.indexOf('../../') < 0 &&
                    !p.isDeleted)
                .sort((a, b) => b.created - a.created);

            return templates.get('gallery-' + size);
        })
        .then(function(template) {
            context.$element().html(template({ posts }));
            pageHelpers.zoomin();
        })
        .catch(function(err) {
            toastr.error(err.message, 'Something very bad happened');
        });
}

export { all };
