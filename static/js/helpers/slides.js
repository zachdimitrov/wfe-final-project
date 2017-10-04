$(document).ready(function() {
    var $frames = $('#slide-main .slide-frame');
    var $left = $('#slide-main .slide-left-arrow');
    var $right = $('#slide-main .slide-right-arrow');
    var $zoom = $('#slide-main .slide-zoom');
    var $open = $('#slide-main .slide-link');
    var len = $frames.length;

    $left.click(function(ev) {
        moveFrames('left');
    });

    $right.click(function(ev) {
        moveFrames('right');
    });

    function moveFrames(dir) {
        for (var i = 0; i < len; i++) {
            var frame = $($frames[i]);
            var cls = frame.attr('class')
                .split(' ')
                .find(function(x) {
                    return (x.indexOf('frame-') >= 0);
                });

            var num = +cls.split('-')[1];

            $(frame).removeClass(cls);

            if (dir === 'left') {
                if (num === 0) {
                    $(frame).addClass('frame-' + (len - 1))
                } else {
                    $(frame).addClass('frame-' + (num - 1));
                }
            } else {
                if (num === len - 1) {
                    $(frame).addClass('frame-' + 0)
                } else {
                    $(frame).addClass('frame-' + (num + 1));
                }
            }
        }
    }
});