jQuery(function($) {

    'use strict';

    $(function() {
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut('slow');
    });

    (function() {
        var nav = $('.navbar');
        var scrolled = false;

        $(window).scroll(function() {
            if (110 < $(window).scrollTop() && !scrolled) {
                nav.addClass('sticky animated fadeInDown').animate({
                    'margin-top': '0px'
                });
                scrolled = true;
            }
            if (110 > $(window).scrollTop() && scrolled) {
                nav.removeClass('sticky animated fadeInDown').css('margin-top', '0px');
                scrolled = false;
            }
        });

    }());

    $(function() {
        $(".sticky-div").stick_in_parent({
            container: $(".sticky-container"),
            offset_top: 90
        });
    });

    $(function() {
        $('a[href="#search"]').on('click', function(event) {
            event.preventDefault();
            $('#search').addClass('open');
            $('#search > form > input[type="search"]').focus();
        });

        $('#search, #search button.close').on('click keyup', function(event) {
            if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                $(this).removeClass('open');
            }
        });
    });

    (function() {
        $('.img-link').magnificPopup({
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            type: 'image'
        });
    }());

    (function() {
        [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
            new SelectFx(el);
        });
    })();

    (function() {
        $('button.navbar-toggle').HippoOffCanvasMenu({
            documentWrapper: '#st-container',
            contentWrapper: '.st-content',
            position: 'hippo-offcanvas-left',
            effect: 'slide-in-on-top',
            closeButton: '#off-canvas-close-btn',
            menuWrapper: '.offcanvas-menu',
            documentPusher: '.st-pusher'
        });
        var ico = $('<i class="fa fa-caret-right"></i>');
        $('#offcanvasMenu li:has(ul) > a').append(ico);

        $('#offcanvasMenu > li:has(ul)').on('click', function() {
            $(this).toggleClass('open');
        });
    }());

    (function() {
        $('.partner-carousel').owlCarousel({
            loop: true,
            margin: 15,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 6
                }
            }
        });

        var owl = $('.partner-carousel');
        owl.owlCarousel();

        $('.partner-carousel-navigation .next').on('click', function() {
            owl.trigger('next.owl.carousel');
        });

        $('.partner-carousel-navigation .prev').on('click', function() {
            owl.trigger('prev.owl.carousel', [300]);
        });
    }());

    $('.count-description').bind('inview', function(event, visible) {
        if (visible) {
            $(this).find('.timer').each(function() {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });

    $('.company-in-number').bind('inview', function(event, visible) {
        if (visible) {
            $(this).find('.timer').each(function() {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });

    (function() {
        function getIEVersion() {
            var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            return match ? parseInt(match[1]) : false;
        }

        if (getIEVersion()) {
            $('html').addClass('ie' + getIEVersion());
        }

        if ($('html').hasClass('ie9') || $('html').hasClass('ie10')) {
            $('.submenu-wrapper').each(function() {
                $(this).addClass('no-pointer-events');
            });
        }
    }());

    (function() {
        $('body').append('<div id="toTop"><i class="fa fa-angle-double-up"></i></div>');

        $(window).scroll(function() {
            if ($(this).scrollTop() != 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        });

        $('#toTop').on('click', function() {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
    }());

    $(window).on('load', function() {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $.stellar({
                horizontalScrolling: false,
                responsive: true
            });
        }
    });

    (function() {
        function getIEVersion() {
            var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            return match ? parseInt(match[1]) : false;
        }

        if (getIEVersion()) {
            $('html').addClass('ie' + getIEVersion());
        }

        if ($('html').hasClass('ie9') || $('html').hasClass('ie10')) {
            $('.submenu-wrapper').each(function() {
                $(this).addClass('no-pointer-events');
            });
        }

        var timer;

        $('li.dropdown').on('mouseenter', function(event) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            $(this).removeClass('open menu-animating').addClass('menu-animating');
            var that = this;

            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            timer = setTimeout(function() {
                $(that).removeClass('menu-animating');
                $(that).addClass('open');
            }, 300);
        });

        $('li.dropdown').on('mouseleave', function(event) {
            var that = this;
            $(this).removeClass('open menu-animating').addClass('menu-animating');

            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            timer = setTimeout(function() {
                $(that).removeClass('menu-animating');
                $(that).removeClass('open');
            }, 300);
        });
    }());

    (function() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();

            var $action = $(this).prop('action');
            var $data = $(this).serialize();
            var $this = $(this);

            $this.prevAll('.alert').remove();

            $.post($action, $data, function(data) {
                if (data.response == 'error') {
                    $this.before('<div class="alert alert-danger">' + data.message + '</div>');
                }
                if (data.response == 'success') {
                    $this.before('<div class="alert alert-success">' + data.message + '</div>');
                    $this.find('input, textarea').val('');
                }
            }, "json");
        });
    }());

    var $latitude = 48.869319,
        $longitude = 2.354261,
        $map_zoom = 16;

    var $marker_url = 'img/map-marker.png';

    var style = [{
        "stylers": [{
            "hue": "#65d3e3"
        }, {
            "saturation": -10
        }, {
            "gamma": 2.15
        }, {
            "lightness": 12
        }]
    }];

    (function() {
        if ($('#contactMap').length > 0) {
            var map_options = {
                center: new google.maps.LatLng($latitude, $longitude),
                zoom: $map_zoom,
                panControl: true,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            };

            var map = new google.maps.Map(document.getElementById('contactMap'), map_options);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($latitude, $longitude),
                map: map,
                visible: true,
                icon: $marker_url,
            });
        }
    }());

    (function() {
        if ($('#googleMap').length > 0) {
            var map_options = {
                center: new google.maps.LatLng($latitude, $longitude),
                zoom: $map_zoom,
                panControl: true,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            };

            var map = new google.maps.Map(document.getElementById('googleMap'), map_options);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($latitude, $longitude),
                map: map,
                visible: true,
                icon: $marker_url,
            });

            $('#cssMapModal').on('shown.bs.modal', function() {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(new google.maps.LatLng($latitude, $longitude));
            });
        }
    }());

});
