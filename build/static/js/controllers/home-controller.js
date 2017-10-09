'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.all = undefined;

var _data = require('data');

var data = _interopRequireWildcard(_data);

var _templateRequester = require('template-requester');

var templates = _interopRequireWildcard(_templateRequester);

var _pageHelpers = require('page-helpers');

var pageHelpers = _interopRequireWildcard(_pageHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function all(context, tpl) {
    var user = data.users.authUser();
    var posts = void 0;
    data.posts.get(1, 7).then(function (resPosts) {
        posts = resPosts;
        return templates.get(tpl);
    }).then(function (template) {
        context.$element().html(template({ posts: posts, user: user }));
        pageHelpers.zoomin();
        pageHelpers.slides();
    }).catch(function (err) {
        toastr.error(err.message, 'Something very bad happened');
    });
} /* globals toastr */
/* eslint-disable no-invalid-this */

exports.all = all;