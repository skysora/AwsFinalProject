/*
 * jQuery liquid carousel v1.0
 * http://www.nikolakis.net
 *
 * Copyright 2010, John Nikolakis
 * Free to use under the GPL license.
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($){
	$.fn.liquidcarousel = function(options) {

	var defaults = {
		height: 150,
		duration: 100,
		hidearrows: true
	};
	var options = $.extend(defaults, options);

    return this.each(function() {
			var divobj = $(this);

			$(divobj).height(options.height);
			$(divobj).css('overflow', 'hidden');

			$('> .wrapper', divobj).height(options.height);
			$('> .wrapper', divobj).css('overflow', 'hidden');
			$('> .wrapper', divobj).css('float', 'left');

			$('> .wrapper > ul', divobj).height(options.height);
			$('> .wrapper > ul', divobj).css('float', 'left');
			$('> .wrapper > ul', divobj).css('margin', '0');
			$('> .wrapper > ul', divobj).css('padding', '0');
			//$('> .wrapper > ul', divobj).css('display', 'block');

			$('> .wrapper > ul > li', divobj).height(options.height);
			//$('> .wrapper > ul > li', divobj).css('display', 'block');
			$('> .wrapper > ul > li', divobj).css('float', 'left');


			var originalmarginright = parseInt($('> .wrapper > ul > li', divobj).css('marginRight'));
			var originalmarginleft = parseInt($('> .wrapper > ul > li', divobj).css('marginLeft'));
			var visiblelis = 0;
			var totallis = $('> .wrapper > ul > li', this).length;
			var currentposition = 0;
			var liwidth = $('> .wrapper > ul > li:first', divobj).outerWidth(true);
			var additionalmargin = 0;
			var totalwidth = liwidth + additionalmargin;

			$(window).resize(function(e){
				if (window.console){ console.log("jquery.liquidcarousel resize"); }
				var divwidth = $(divobj).width();
				var availablewidth = (divwidth - $('> .previous', divobj).outerWidth(true) - $('> .next', divobj).outerWidth(true));

				previousvisiblelis = visiblelis;
				visiblelis = Math.floor((availablewidth / liwidth));
				if (window.console){ console.log("visiblelis:"+visiblelis+" , total:"+totallis); }
				liquidMargin=true;
				if (visiblelis > totallis) { 
					liquidMargin=false; 
					$('> .previous', divobj).addClass('hide');
					$('> .next', divobj).addClass('hide');
					return false;			
				}
		
				if (visiblelis < totallis) {
					additionalmargin = Math.floor((availablewidth - (visiblelis * liwidth))/visiblelis);
				} else {
					additionalmargin = Math.floor((availablewidth - (totallis * liwidth))/totallis);
				}
				halfadditionalmargin = Math.floor(additionalmargin/2);
				totalwidth = liwidth + additionalmargin;
				
				if (visiblelis > totallis) {
				}else{
					$('> .wrapper > ul > li', divobj).css('marginRight', originalmarginright + halfadditionalmargin);
					$('> .wrapper > ul > li', divobj).css('marginLeft',originalmarginleft + halfadditionalmargin);							
				}

				if (visiblelis > previousvisiblelis  || totallis <= visiblelis) {
					currentposition -= (visiblelis-previousvisiblelis);
					if (currentposition < 0 || totallis <= visiblelis ) {
						currentposition = 0;
					}
				}
				$('> .wrapper > ul', divobj).css('marginLeft', -(currentposition * totalwidth));
				
				$('> .previous', divobj).addClass('hide');					

				
				if (visiblelis >= totallis || ((divwidth >= (totallis * liwidth)) && options.hidearrows) ) {
					if (options.hidearrows) {
						//$('> .previous', divobj).addClass('hide');
						$('> .next', divobj).addClass('hide');

						additionalmargin = Math.floor((divwidth - (totallis * liwidth))/totallis);
						halfadditionalmargin = Math.floor(additionalmargin/2);
						totalwidth = liwidth + additionalmargin;
						$('> .wrapper > ul > li', divobj).css('marginRight', originalmarginright + halfadditionalmargin);
						$('> .wrapper > ul > li', divobj).css('marginLeft', originalmarginleft + halfadditionalmargin);
					}
					$('> .wrapper', divobj).width(totallis * totalwidth);
					$('> ul', divobj).width(totallis * totalwidth);
					$('> .wrapper', divobj).css('marginLeft', 0);
					currentposition = 0;
				} else {
					//$('> .previous', divobj).removeClass('hide');
					$('> .next', divobj).removeClass('hide');
					$('> .wrapper', divobj).width(visiblelis * totalwidth);
					$('> ul', divobj).width(visiblelis * totalwidth);
				}
			});

			$('> .next', divobj).click(function(){
				if($(this).hasClass("hide")){ return false; }
				if (totallis <= visiblelis) {
					currentposition = 0;
				} else if ((currentposition + (visiblelis*2)) < totallis) {
					currentposition += visiblelis;
				} else if ((currentposition + (visiblelis*2)) >= totallis -1) {
					currentposition = totallis - visiblelis;
				}
				$('> .wrapper > ul', divobj).stop();
				$('> .wrapper > ul', divobj).animate({'marginLeft': -(currentposition * totalwidth)}, options.duration);
				
				//add
				if (totallis == (visiblelis+currentposition)) {
					$('> .next', divobj).addClass('hide');
					$('> .previous', divobj).removeClass('hide');
				}else if(currentposition>0){
					$('> .previous', divobj).removeClass('hide');
				}			
				console.log("next currentposition:"+currentposition);
			});

			$('> .previous', divobj).click(function(){
				if($(this).hasClass("hide")){ return false; }
				if ((currentposition - visiblelis) > 0) {
					currentposition -= visiblelis;
				} else if ((currentposition - (visiblelis*2)) <= 0) {
					currentposition = 0;
				}
				$('> .wrapper > ul', divobj).stop();
				$('> .wrapper > ul', divobj).animate({'marginLeft': -(currentposition * totalwidth)}, options.duration);
				
				//add
				if (currentposition==0) {
					$('> .next', divobj).removeClass('hide');
					$('> .previous', divobj).addClass('hide');
				}else{
					$('> .next', divobj).removeClass('hide');
				}				
				console.log("previous currentposition:"+currentposition);
			});

			$('> .next', divobj).dblclick(function(e){
				if($(this).hasClass("hide")){ return false; }
				e.preventDefault();
				clearSelection();
			});

			$('> .previous', divobj).dblclick(function(e){
				if($(this).hasClass("hide")){ return false; }
				e.preventDefault();
				clearSelection();
			});

			function clearSelection() {
				if (document.selection && document.selection.empty) {
					document.selection.empty();
				} else if (window.getSelection) {
					var sel = window.getSelection();
					sel.removeAllRanges();
				}
			}

			$(window).resize();
    });


 };
})(jQuery);
