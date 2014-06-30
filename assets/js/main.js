var NP = window.NP || {};

NP.app = function() {
    // Private

    // Slider
    $(".b-slider__item").first().addClass("current");

    $('.b-slider__items').slick({
        dots: false,
        infinite: true,
        arrows: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3   ,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    infinite: true,
                    arrows: false
                }
            }
        ]
    });
    $(".b-slider__nav__item--prev--js").on("click", function() {
        $('.b-slider__items').slickPrev();
    });
    $(".b-slider__nav__item--next--js").on("click", function() {
        $('.b-slider__items').slickNext();
    });
    $(".b-slider__item").on("click", function() {
        $(".b-slider__item").removeClass("current");
        $(this).addClass("current");
        var src = $(this).data("format");
        $(".b-sample__format").fadeOut(function() {
            $(this).html("");

            var $img = $("<img />");
            $img.attr("src", src);
            $(this).append($img);

            $(this).fadeIn();
        });
    });

    $(".b-follow").on("click", function() {
        $("body,html").animate({
            scrollTop: $(".b-slider").offset().top - 40 + "px"
        });
    });

    // Public
    return this;
};

NP.popup = function(el) {
    this.$trigger = $(el);
    this.$popup = $( $(el).data("popup") );

    this.hidePopup = function(e) {
        if( e ) {
            e.preventDefault();
        }

        this.$popup.fadeOut();
    };
    this.hideAll = function(e) {
        if( e ) {
            e.preventDefault();
        }
        this.hidePopup();
    };
    this.showPopup = function(e) {
        e.preventDefault();

        $(".b-popup").fadeOut();

        this.$popup.fadeIn();
    };
    this.$trigger.on("touchstart, click", $.proxy(this.showPopup, this));
    this.$popup.find(".b-popup__close--js").on("touchstart, click", $.proxy(this.hideAll, this));

    this.hidePopup();
};

$(function() {
    FastClick.attach(document.body);
    NP.app = NP.app();

    $(".popup-trigger--js").each($.proxy(function(i, el) {
        new NP.popup(el);
    }, this));
});