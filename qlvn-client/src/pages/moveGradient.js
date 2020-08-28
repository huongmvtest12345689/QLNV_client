import $ from 'jquery'
$(document).mousemove(function(event) {
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();

    let mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
    let mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

    $('.login-body').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #9b59b6)');
    $('.exception-body').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #9b59b6)');
});
