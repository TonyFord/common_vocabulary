function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function stripHtml(html)
{
   var tmp = document.createElement('DIV');
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || '';
}

function json_load( url ){
  var json = null;
  $.ajax({
      'async': false,
      'global': false,
      'cache': false,
      'url': url,
      'dataType': "json",
      'success': function (data) {
          json = data;
      }
  });
  return json;
}
