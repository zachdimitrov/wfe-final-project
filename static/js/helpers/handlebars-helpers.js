/* globals Handlebars moment */

function init() {
    Handlebars.registerHelper('listItem', function(from, to, context, options) {
        let item = '';
        for (let i = from, j = to; i <= j; i++) {
            item = item + options.fn(context[i]);
        }
        return item;
    });

    Handlebars.registerHelper('date', function(datetime) {
        const format = 'll';
        return moment(datetime).format(format);
    });

    Handlebars.registerHelper('dateXS', function(datetime) {
        const format = 'd[/]YYYY';
        return moment(datetime).format(format);
    });

    Handlebars.registerHelper('partial', function(text, length) {
        if (text.length > length) {
            return text.slice(0, length) + '...';
        }
        return text;
    });

    Handlebars.registerHelper('lowercase', function(text) {
        return text.toLowerCase();
    });
}

export { init };
