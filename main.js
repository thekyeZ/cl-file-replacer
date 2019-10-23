var fs = require('fs');
// var path = require('path');

fs.readFile('./gulpfile.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/browsers/g, 'overrideBrowserslist');

  fs.writeFile('./test.js', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});