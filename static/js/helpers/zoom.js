/* globals $ */

$(document).ready(function() {
    const zoom = $('.slide-zoom');

    zoom.click(function(ev) {
        const selected = $(ev.target).parent();
        const img = selected.prevAll('img');
        const name = selected.parent().find('h2').html() || img.attr('name');
        const src = img.attr('src');

        $('#slide-container').hide();

        if ($('.image-view').length) {
            $('.image-view').remove();
        }

        const $image = $('<img />')
            .attr('src', src)
            .attr('width', '100%');

        $('<div />')
            .addClass('image-view')
            .append($image)
            .append('<h4>' + name + '</h4>')
            .append('<p>click to close</p>')
            .appendTo('header')
            .click(function(evt) {
                $('.image-view').remove();
                $('#slide-container').show();
            })
            .animate({
                width: '90%',
            });
    });
});
