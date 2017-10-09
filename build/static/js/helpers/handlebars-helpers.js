'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* globals Handlebars moment */

function init() {
    Handlebars.registerHelper('listItem', function (from, to, context, options) {
        var item = '';
        for (var i = from, j = to; i <= j; i++) {
            item = item + options.fn(context[i]);
        }
        return item;
    });

    Handlebars.registerHelper('date', function (datetime) {
        var format = 'll';
        return moment(datetime).format(format);
    });

    Handlebars.registerHelper('dateXS', function (datetime) {
        var format = 'M[/]YYYY';
        return moment(datetime).format(format);
    });

    Handlebars.registerHelper('partial', function (text, length) {
        if (length <= 0 || typeof length !== 'number') {
            return new Handlebars.SafeString(text);
        }

        if (text.length > length) {
            text = text.slice(0, length) + '...';
            return new Handlebars.SafeString(text);
        }

        return new Handlebars.SafeString(text);
    });

    Handlebars.registerHelper('lowercase', function (text) {
        return text.toLowerCase();
    });
}

exports.init = init;