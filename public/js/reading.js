var readingTable;

loadReading = function(d){
  $('.spinner').remove();
  $('#reading thead').append('<tr><th>title</th><th>author</th>' +
    '<th>date</th><th>rating</th><th>lname</th><th>genre</th></tr>');
  d.filter(function(d){ return d.title; }).forEach(function(b){
    var book = $('<tr></tr>');
    book.append('<td>' + b.title + '</td>');
    book.append('<td>' + b.author + '</td>');
    book.append('<td>' + b.date + '</td>');
    book.append('<td>' + '&#9733'.repeat(b.rating.length) + '</td>');
    book.append('<td>' + b.lname + '</td>');
    book.append('<td>' + b.genre + '</td>');
    $('#reading tbody').append(book);
  });
  readingTable = $('#reading').dataTable({
    "sort": true,
    "order": [[ 2, "desc" ]],
    "paging": false,
    "scrollY": 500,
    "oLanguage": {
      "sInfoFiltered": ""
    },
    "columnDefs": [
      {
        "targets": [ 4, 5 ],
        "visible": false
      },
      {
        "aTargets": [ 1 ],
        "iDataSort": 4 ,
      }],
    "dom": "ift"
  });
}

$(document).ready(function(){
  $('.footer-nav li').on('click', 'a', function(e){
    //if ($('#reading').length){
      e.preventDefault();
    //}
    if ($(this).closest('li').hasClass('active')){
      // pass
    } else {
      $('.footer-nav li').removeClass('active');
      $(this).closest('li').addClass('active');
      var lang = $(this).text().toLowerCase();
      if ($('#reading').length){ // page is reading
        if (lang == 'all'){
          readingTable.fnFilter('', 5);
        } else {
          readingTable.fnFilter(lang, 5);
        }
      } else {
        if (lang == 'all'){
          $('.poem').fadeIn();
        } else {
          $('.poem').hide();
          $('.poem.' + lang).fadeIn();
        }
      }
    }
    createTOC();
  });

  if ($('.poem').length){
    createTOC();
  }

  // initialize reading datatables
  if ($('#reading').length){
    // get data
    Papa.parse('/public/data/reading.csv',{
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        loadReading(results.data);
      }
    });
  }
});
