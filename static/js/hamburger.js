$(document).ready(function() {
    var width = window.innerWidth;

    crossMenu(width);

    $(window).resize(function() {
        width = window.innerWidth;
        crossMenu(width);
    });

    function crossMenu(w) {
        if (w < 720) {
            $(".cross").hide();
            $(".hamburger").show();
            $("#menu-main").hide();
        } else {
            $("#menu-main").show();
        }
    }

    $(".hamburger").click(function() {
        $("#menu-main").slideToggle("slow", function() {
            $(".hamburger").hide();
            $(".cross").show();
        });
    });

    $(".cross").click(function() {
        $("#menu-main").slideToggle("slow", function() {
            $(".cross").hide();
            $(".hamburger").show();
        });
    });
});