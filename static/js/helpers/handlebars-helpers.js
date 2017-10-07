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
        const format = 'M[/]YYYY';
        return moment(datetime).format(format);
    });

    Handlebars.registerHelper('partial', function(text, length) {
        if (length <= 0 || typeof(length) !=='number') {
            return new Handlebars.SafeString(text);
        }

        if (text.length > length) {
            text = text.slice(0, length) + '...';
            return new Handlebars.SafeString(text);
        }

        return new Handlebars.SafeString(text);
    });

    Handlebars.registerHelper('lowercase', function(text) {
        return text.toLowerCase();
    });
}

export { init };
