/* globals Handlebars */

function init() {
    Handlebars.registerHelper('listItem', function(from, to, context, options) {
        let item = '';
        for (let i = from, j = to; i <= j; i++) {
            item = item + options.fn(context[i]);
        }
        return item;
    });
}

export { init };
