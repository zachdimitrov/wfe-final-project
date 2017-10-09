'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* globals $ */
/* eslint-disable no-undefined */

function send(method, url, options) {
    options = options || {};

    var headers = options.headers || {};
    var data = options.data || undefined;

    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            headers: headers,
            data: JSON.stringify(data),
            success: function success(res) {
                resolve(res);
            },
            error: function error(err) {
                reject(err);
            }
        });
    });
    return promise;
}

function get(url, options) {
    return send('GET', url, options);
}

function post(url, options) {
    return send('POST', url, options);
}

function put(url, options) {
    return send('PUT', url, options);
}

function del(url, options) {
    return send('DELETE', url, options);
}

exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;