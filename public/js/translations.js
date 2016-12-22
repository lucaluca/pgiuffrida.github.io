$(document).ready(function(){
  $('.footer-nav li').on('click', 'a', function(e){
    e.preventDefault();
    if ($(this).closest('li').hasClass('active')){
      // pass
    } else {
      $('.footer-nav li').removeClass('active');
      $(this).closest('li').addClass('active');
      var lang = $(this).text().toLowerCase();
      $('.translation').hide();
      $('.translation.' + lang).fadeIn();
    }
  });
});