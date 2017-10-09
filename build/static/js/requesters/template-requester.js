"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* globals $ Handlebars */

var cache = {};

function get(name) {
    var promise = new Promise(function (resolve, reject) {
        if (cache[name]) {
            resolve(cache[name]);
            return;
        }
        var url = "templates/" + name + ".handlebars";
        $.get(url, function (html) {
            var template = Handlebars.compile(html);
            cache[name] = template;
            resolve(template);
        });
    });
    return promise;
}

exports.get = get;