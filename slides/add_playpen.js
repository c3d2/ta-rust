var elements= document.querySelectorAll('pre.rust code');
Array.prototype.forEach.call(elements, function(el) {

  // highlight
  hljs.highlightBlock(el);

  var a = document.createElement('a');
  a.setAttribute('class', 'test-arrow');
  a.textContent = 'Run';
  playgroundUrl = "https://play.rust-lang.org/"

  var code = el.textContent;


  a.setAttribute('href', playgroundUrl + '?code=' +
      encodeURIComponent(code));
  a.setAttribute('target', '_blank');
  a.setAttribute('class', 'runlink');
  a.setAttribute('id', 'runlink');

  $(a).click(function(event){
    event.preventDefault();
    runProgram(code, function(statcode,result){
      //alert(result);
      $(el).append("<hr/><code style=\"color:#f00\">");
      $(el).append(result);
      $(el).append("</code>");
    })
  });

  el.appendChild(a);

});

$(document).ready(function() {
  $( 'pre.cpp code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $( 'pre.rust-norun code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});


var SUCCESS = 0;
var ERROR = 1;
var WARNING = 2;

function runProgram(program, callback) {
  var req = new XMLHttpRequest();
  var data = JSON.stringify({
    version: "stable",
      optimize: "0",
      code: program
  });

  // console.log("Sending", data);
  req.open('POST', "https://play.rust-lang.org/evaluate.json", true);
  req.onload = function(e) {
    if (req.readyState === 4 && req.status === 200) {
      var result = JSON.parse(req.response).result;

      // Need server support to get an accurate version of this.
      var statusCode = SUCCESS;
      if (result.indexOf("error:") !== -1) {
        statusCode = ERROR;
      } else if (result.indexOf("warning:") !== -1) {
        statusCode = WARNING;
      }

      callback(statusCode, result);
    } else {
      callback(false, null);
    }
  };

  req.onerror = function(e) {
    callback(false, null);
  }

  req.setRequestHeader("Content-Type", "application/json");
  req.send(data);
}
