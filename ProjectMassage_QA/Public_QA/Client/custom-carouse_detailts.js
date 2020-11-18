$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:5,
        nav:false,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:3,
            },
            600:{
                items:3
            },
            1000:{
                items:6
            }
        }
    })
});  
$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
});     

 