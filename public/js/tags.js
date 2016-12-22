// get query string
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString
  // from http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

$(document).ready(function(){
  if (typeof QueryString.tag !== 'undefined'){
    var tag = QueryString.tag;
  } else {
    var tag = '';
  }
  var tagged = $('.tag-' + tag);
  if (tagged.length){
    tagged.fadeIn('slow');  
    $('.tagheader').html('<i>Projects tagged "' + tag + '"</i><br/><br/>');
  } else if (tag == ''){
    $('.content').append('Please enter a tag in the url, e.g. <a href="/projects/tags?tag=policy">?tag=policy</a>');
  } else {
    $('.content').append('No projects with tag "' + tag + '". Sorry!');
  }
});