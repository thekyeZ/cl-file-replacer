var fs = require('fs');
// var path = require('path');

const { readdirSync } = require('fs')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => dirent.name[0] != ".")
    .map(dirent => dirent.name)
    .forEach(el => replacecon(el));

getDirectories('./')    

function replacecon(file) {
    const path = file +'/gulpfile.js'
    fs.readFile(path, 'utf8', function (err,data) {
        if (err && err.errno == -2) {
            return console.log(`Nie znaleziono gulpfile.js w katalogu `+path);
        } 

        console.log(`Znaleziono gulpfile.js w katalogu `+path)
        console.log(data);
        var result = data.replace(/browsers/g, 'overrideBrowserslist');
        
        fs.writeFile(path, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

