/* globals $ */
import * as Handlebars from 'handlebars';

$(document).ready(function() {
    Handlebars.registerHelper('index_of', function(context, ndx) {
        return context[ndx];
    });
});
