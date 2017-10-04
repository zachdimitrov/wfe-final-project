/* globals $ */
/* eslint-disable no-invalid-this */

import * as data from 'data';
import * as templates from 'template-requester';
import { toastr } from 'toastsr';

function all(context) {
    let posts;
    data.posts.get()
        .then(function(resPosts) {
            posts = resPosts;
            return templates.get('home');
        })
        .then(function(template) {
            context.$element().html(template(posts));
        })
        .catch(function(err) {
            toastr.error('Something very bad happened');
            document.location.reload(true);
        });
}

export { all };
