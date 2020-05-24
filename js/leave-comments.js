 $(document).ready(function() {
     $(window).scroll(function() {
         console.log($(this).scrollTop());

         if ($(this).scrollTop() > 150) {
             $('.nail-box').css({ opacity: '1' });
			 $("#sinyi_softmobile-footer").css("padding-bottom",($(".nail-box").outerHeight()-1)+"px");

             // ------------
         } else if ($(this).scrollTop() > 90) {
             $('.nail-box').css({ opacity: '0' });
             $("#sinyi_softmobile-footer").css("padding-bottom","");				
             // ------------
         }
     });
 });
