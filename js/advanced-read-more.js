//-------------------------------------------------------------------------------------
// Advanced Scroll Progress Tracker
//-------------------------------------------------------------------------------------
// Created          2016-08-29
// Changed          2016-09-01
// Authors          David Whitworth | David@Whitworth.de
//-------------------------------------------------------------------------------------
// 2016-08-29       Created
// 2016-09-01 DW    added the linking function; cleaned up the code
//-------------------------------------------------------------------------------------
// Copyright (c) 2016
//-------------------------------------------------------------------------------------

$.fn.readMore = function(options) {
    // Default Options -->
    var settings = $.extend({
        showLines: 8,                               // sets the number of lines to display; i.e. the ninth line and all thereafter will be hidden
        showParagraph: false,                       // if set to true, the plugin will cut off after the first paragraph instead of a number of lines ---> overwrites showLines
        linking: true,                              // if set to false, the text will just be truncated without a "read more" link
        linkCaption: 'read more',                   // defines the caption of the read more toggle
        linkCloseCaption: 'read less',              // defines the caption of the read less toggle
        linkHint: 'Click to see full article',      // sets the title (i.e. the mouseover hint) of the read more toggle
        animationSpeed: 800,                        // sets the duration of the open/close animation in milliseconds; set to 0 to toggle w/o animation
        previewTextOnly: true                       // if set to false everything (including images etc.) within the height of showLines lines will be visible
    }, options);
    // <-- Default options
    
    var lineHeight;
    
    $(document).ready(function () {
        $('.jrm-truncate').each(function(index) {
            var sectionId = index + 1,
                sectionFullHeight = $(this).outerHeight(),
                sectionLines, sectionHeight, sectionMarginTop, linkCaption, linkCloseCaption, sectionHeadline;
                
            $(this).addClass('jrm-' + sectionId);
            
            // get line-height --> //
//            lineHeight = $(this).children(':first-child').css('line-height');
            $(this).children(':first-child').append('<div id="Temp">&nbsp;</div>');
            lineHeight = $('#Temp').height();
            $('#Temp').remove();
            // <-- get line-height //
            
            // transfer first child's margin-top to the container to keep elements within --> //
            sectionMarginTop = parseFloat($(this).children(':first-child').css('margin-top'));
            if (sectionMarginTop != 0) {
                $(this).css('margin-top', sectionMarginTop);
                $(this).children(':first-child').css('margin-top', 0);
            }
            // <-- transfer first child's margin-top to the container to keep elements within //
            
            // define the reduced-state height of the container either as lines * line-height or as first paragraph's height --> //
            if (!settings.showParagraph && $(this).attr('data-lines') != -1) {
                if ($(this).attr('data-lines')) {
                    sectionLines = parseFloat($(this).attr('data-lines'));
                } else {
                    sectionLines = parseFloat(settings.showLines);
                }
                sectionHeight = sectionLines * parseFloat(lineHeight);
            } else {
                sectionHeight = parseFloat($(this).children('p:first-child').outerHeight());
            }
            // <-- define the reduced-state height of the container either as lines * line-height or as first paragraph's height //
            
            // set the caption of the "read more" / "read less" links --> //
            if ($(this).attr('data-link-caption')) {
                linkCaption = $(this).attr('data-link-caption');
            } else {
                linkCaption = settings.linkCaption;
            }
            if ($(this).attr('data-link-closecaption')) {
                linkCloseCaption = $(this).attr('data-link-closecaption');
            } else {
                linkCloseCaption = settings.linkCloseCaption;
            }
            // <-- set the caption of the "read more" / "read less" links //
            
            // reduce content if necessary and append "read more" link --> //
            if (sectionFullHeight > sectionHeight) {
                $(this).css('height', sectionHeight).addClass('jrm-reduced');
                if (settings.linking || $(this).attr('data-linking') == 'true' || $(this).attr('data-linking') == 'open only') {
                    $('<span class="jrm-toggle" data-id="' + sectionId + '" title="' + settings.linkHint + '">' + linkCaption + '</span>').insertAfter($(this));
                } else if (!setting.linking || $(this).attr('data-linking') != 'true') {
                    $(this).prepend('<p id="Temp">&nbsp;</p>');
                    $(this).css('margin-bottom', $('#Temp').css('margin-bottom'));
                    $('#Temp').remove();
                }
                if (settings.previewTextOnly) {
                    $(this).addClass('jrm-textOnly');
                }
            }
            // <-- reduce content if necessary and append "read more" link //
            
        });
        // "read more" / "read less" link functionality --> //
        $('.jrm-toggle').click(function() {
            var toggleLink = $(this),
                childrenContainer = toggleLink.parent().children('.jrm-' + toggleLink.attr('data-id')),
                animationDuration;

            if (settings.linking != true || childrenContainer.attr('data-linking') == 'open only') {
                toggleLink.remove();
            }
            
            if (childrenContainer.attr('data-duration')) {
                animationDuration = parseFloat(childrenContainer.attr('data-duration'));
            } else {
                animationDuration = settings.animationSpeed;
            }
            
            // define the reduced-state height of the container either as lines * line-height or as first paragraph's height --> //
            if (!settings.showParagraph && childrenContainer.attr('data-lines') != -1) {
                if (childrenContainer.attr('data-lines')) {
                    sectionLines = parseFloat(childrenContainer.attr('data-lines'));
                } else {
                    sectionLines = parseFloat(settings.showLines);
                }
                sectionHeight = sectionLines * parseFloat(lineHeight);
            } else {
                sectionHeight = parseFloat(childrenContainer.children('p:first-child').outerHeight());
            }
            // <-- define the reduced-state height of the container either as lines * line-height or as first paragraph's height //

            // set the caption of the "read more" / "read less" links --> //
            if (childrenContainer.attr('data-link-caption')) {
                linkCaption = childrenContainer.attr('data-link-caption');
            } else {
                linkCaption = settings.linkCaption;
            }
            if (childrenContainer.attr('data-link-closecaption')) {
                linkCloseCaption = childrenContainer.attr('data-link-closecaption');
            } else {
                linkCloseCaption = settings.linkCloseCaption;
            }
            // <-- set the caption of the "read more" / "read less" links //
            
            if (childrenContainer.hasClass('jrm-reduced')) {
                
                setTimeout(function() {
                    childrenContainer.removeClass('jrm-reduced');
                }, 1);
                    
                var childrenCount = childrenContainer.children().length,
                    childrenHeight = 0;
                    
                for (i = 1; i < childrenCount + 1; i ++) {
                    childrenHeight = childrenHeight + childrenContainer.children(':nth-child(' + i + ')').outerHeight(true)
                }

                childrenContainer.animate( {
                    height: childrenHeight
                }, animationDuration);
                
                setTimeout(function() {
                    toggleLink.text(linkCloseCaption).attr('title', '');
                    $(window).resize();
                }, animationDuration);
            } else {
                childrenContainer.animate( {
                    height: sectionHeight
                }, animationDuration);
                
                setTimeout(function() {
                    toggleLink.text(linkCaption).attr('title', settings.linkHint);
                    childrenContainer.addClass('jrm-reduced');
                    $(window).resize();
                }, animationDuration);
            }
        });
        // <-- "read more" / "read less" link functionality //
    });
};
