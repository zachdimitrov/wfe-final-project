'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* globals $ */

function zoomin() {
    var zoom = $('.slide-zoom');
    zoom.click(function (ev) {
        var selected = $(ev.target).parent();
        var img = selected.prevAll('.zoomed-image');
        var name = selected.parent().find('h2').html() || img.attr('name');
        var src = img.attr('link');
        var w = window.pageXOffset;
        var h = window.pageYOffset;

        if (name.length > 40) {
            name = name.slice(0, 40) + '...';
        }

        if ($('#slide-container')) {
            $('#slide-container').hide();
        }

        window.scrollTo(0, 240);

        if ($('.image-view').length) {
            $('.image-view').remove();
        }

        var $image = $('<img />').attr('src', src).attr('width', '100%');

        $('<div />').addClass('image-view').append($image).append('<h4>' + name + '</h4>').append('<p>click to close</p>').appendTo('header').click(function (evt) {
            $('.image-view').remove();
            if ($('#slide-container')) {
                $('#slide-container').show();
            }
            window.scrollTo(w, h);
        }).animate({
            width: '90%'
        });
    });
}

function slides() {
    var $frames = $('#slide-main .slide-frame');
    var $left = $('#slide-main .slide-left-arrow');
    var $right = $('#slide-main .slide-right-arrow');
    var len = $frames.length;

    $left.click(function (ev) {
        moveFrames('left');
    });

    $right.click(function (ev) {
        moveFrames('right');
    });

    function moveFrames(dir) {
        for (var i = 0; i < len; i++) {
            var frame = $($frames[i]);
            var cls = frame.attr('class').split(' ').find(function (x) {
                return x.indexOf('frame-') >= 0;
            });

            var num = +cls.split('-')[1];

            $(frame).removeClass(cls);

            if (dir === 'left') {
                if (num === 0) {
                    $(frame).addClass('frame-' + (len - 1));
                } else {
                    $(frame).addClass('frame-' + (num - 1));
                }
            } else {
                if (num === len - 1) {
                    $(frame).addClass('frame-' + 0);
                } else {
                    $(frame).addClass('frame-' + (num + 1));
                }
            }
        }
    }
}

function hamburger() {
    var width = window.innerWidth;

    crossMenu(width);

    $(window).resize(function () {
        width = window.innerWidth;
        crossMenu(width);
    });

    function crossMenu(w) {
        if (w < 720) {
            $('.cross').hide();
            $('.hamburger').show();
            $('#menu-main').hide();
        } else {
            $('#menu-main').show();
        }
    }

    $('.hamburger').click(function () {
        $('#menu-main').slideToggle('slow', function () {
            $('.hamburger').hide();
            $('.cross').show();
        });
    });

    $('.cross').click(function () {
        $('#menu-main').slideToggle('slow', function () {
            $('.cross').hide();
            $('.hamburger').show();
        });
    });

    $('.menu-item').click(function (ev) {
        $('.menu-item').removeClass('selected');
        var nextli = $(ev.target);
        if (nextli.hasClass('menu-item')) {
            nextli.addClass('selected');
        } else {
            $(nextli.parent()).addClass('selected');
        }
    });
}

exports.zoomin = zoomin;
exports.slides = slides;
exports.hamburger = hamburger;