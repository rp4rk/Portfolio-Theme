//When our site is ready
$( document ).ready(function() {
    //If page is just loading
    if(window.location.hash) {
      $(window).scrollTo(0, $(window).scrollTop()+200);
    }
    
    //Detect menu presses
    $(".menu-inner a").click(function(event) {
      event.preventDefault();
      
      if (!$(this).hasClass("highlight")) {

        var target = $(this).attr("href").replace('/', '');

        $(window).stop(true).scrollTo(target, {
          duration: 500,
          offset: -89,
          interrupt:  true
        });
      }
    });
    
    //Handle scrolled to detection
    var watchedDivs = [];
    
    //Cache our menu divs into watchedDivs array
    $(".menu-inner a").each(function(i) {
      //Structure is [div, topDist, bottomDist, menuButton]
      watchedDivs.push([$(this).attr("href").replace('/', ''), 0, 0, this]);  
    });
    
    //Highlight this here
    $(watchedDivs[0][3]).addClass("highlight");
  
    //Check on scroll           
    $(window).scroll(function() {
      var scrollTop     = $(window).scrollTop();
      
      //Calculate distances
      for (i=0; i<watchedDivs.length; i++) {
        var elementTop = $(watchedDivs[i][0]).offset().top;
        var elementBottom = $(watchedDivs[i][0]).offset().top + $(watchedDivs[i][0]).height();
        
        watchedDivs[i][1] = elementTop;
        watchedDivs[i][2] = elementBottom;
      }
      
      //Check what range we are in, highlight accordingly
      for (i=0; i<watchedDivs.length; i++) {
        if (scrollTop < watchedDivs[i][2] && scrollTop > watchedDivs[i][1]-90) {
          $(watchedDivs[i][3]).addClass("highlight");
          
        } else {
          $(watchedDivs[i][3]).removeClass("highlight");
        }
      }
      
      
    });

});