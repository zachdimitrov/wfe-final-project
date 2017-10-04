$(document).ready(function() {
    var zoom = $('.slide-zoom');

    zoom.click(function(ev) {
        var selected = $(ev.target).parent();
        var img = selected.prevAll('img');
        console.log(img.attr('name'));
        var name = selected.parent().find('h2').html() || img.attr('name');
        var src = img.attr('src');
        var slide = img.parent();

        $('#slide-container').hide();

        if ($('.image-view').length) {
            $('.image-view').remove();
        }

        var $image = $('<img />')
            .attr('src', src)
            .attr('width', '100%');

        $('<div />')
            .addClass('image-view')
            .append($image)
            .append('<h4>' + name + '</h4>')
            .append('<p>click to close</p>')
            .appendTo('header')
            .click(function(ev) {
                $('.image-view').remove();
                $('#slide-container').show();
            })
            .animate({
                width: '90%'
            });
    });
});