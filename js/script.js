/*global $, window, document, setTimeout, WOW, jQuery*/
$(document).ready(function () {

    'use strict';
    // Defining used variables
    var skill            = $('.skill');

    
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on("click", function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 48)
            }, 1000, "easeInOutExpo");
            return false;
            }
        }
    });

    //Active Scroll
    $(document).on("scroll", onScroll);
    function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('.nav li a').removeClass("active");
          currLink.addClass("active");
        }
        else{
          currLink.removeClass("active");
        }
      });
    }


    //Type js
    var element = $(".element");
    $(function() {
      element.typed({
        strings: ["a Web Designer.", "a Web Developer.", "a Graphic Designer.", "an Entrepreneur." ],
        typeSpeed: 100,
        loop: true,
      });
    });

    // animating progress values on scroll
    $(window).on('scroll', function () {
        var wScroll = $(window).scrollTop();

        if (wScroll > (skill.offset().top - 400)) {
            skill.each(function (i) {
                setTimeout(function () {
                    skill.eq(i).find('.progress-bar').attr('style', 'width: ' + skill.eq(i).find('li.strength').text() + '');
                }, 200 + (200 * i));
            });
        }

    });



    //Fact Counter + Text Count
    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });

    
    //initialize Slick slider (testimonial slider)
    $("#testimonial-slider").slick({
        dots: false,
        infinite: true,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> << </button>',
        nextArrow: '<button type="button" class="slick-next"> >> </button>',
        arrows: true,
        autoplaySpeed: 2000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }  
            }
        ]
    });


    //portfolio filter
    $(".filter-button").click(function () {
        var value = $(this).attr('data-filter');
        
        if (value === "all") {
            $('.filter').show('1000');
        } else {
            $(".filter").not('.' + value).hide('3000');
            $('.filter').filter('.' + value).show('3000');  
        }
    });
    
});
