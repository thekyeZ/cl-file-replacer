const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const c = require('ansi-colors');

//własna funkcja pokazująca błędy
function ourErrors(err) {
  console.log(c.red("----------------"));
  //by zobaczyć z jakich właściwości możemy skorzystać możemy w konsoli wypisać err.toString()
  console.log(c.red(err.messageFormatted));
  console.log(c.red("----------------"));
  this.emit("end");
}

function compileSass(cb) {
    gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle : "expanded"}).on('error', ourErrors)) //własne błędy
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
    cb();
}

function watcher(cb) {
  gulp.watch('./scss/**/*.scss', gulp.series(compileSass));
}

exports.default = gulp.parallel(compileSass, watcher);