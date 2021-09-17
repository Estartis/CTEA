function open_fullreg () {
$(document).ready(function($) {

    $('.registration').click(function() {
        $('.install-popup-fade').fadeIn();
        return false;
    });

    $('.install-popup-close').click(function() {
        $(this).parents('.install-popup-fade').fadeOut();
        return false;
    });

    $('.install').click(function() {
        $(this).parents('.install-popup-fade').fadeOut();
        return false;
    });

    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('.install-popup-fade').fadeOut();
        }
    });

    $('.install-popup-fade').click(function(e) {
        if ($(e.target).closest('.install-popup').length == 0) {
            $(this).fadeOut();
        }
    });
});
$(document).ready(function($) {

        $('.install').click(function() {
            $('.nickname-popup-fade').fadeIn();
            return false;
        });
    
        $('.nickname-popup-close').click(function() {
            $(this).parents('.nickname-popup-fade').fadeOut();
            return false;
        });
    
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                $('.nickname-popup-fade').fadeOut();
            }
        });
    
        $('.nickname-popup-fade').click(function(e) {
            if ($(e.target).closest('.nickname-popup').length == 0) {
                $(this).fadeOut();
            }
        });
        
});
}
function open_nicknamereg() {
    $(document).ready(function($) {
        $('.registration').click(function() {
            $('.nickname-popup-fade').fadeIn();
            return false;
        });
    
        $('.nickname-popup-close').click(function() {
            $(this).parents('.nickname-popup-fade').fadeOut();
            return false;
        });
    
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                $('.nickname-popup-fade').fadeOut();
            }
        });
    
        $('.nickname-popup-fade').click(function(e) {
            if ($(e.target).closest('.nickname-popup').length == 0) {
                $(this).fadeOut();
            }
        });
    });
}