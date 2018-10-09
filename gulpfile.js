let gulp = require('gulp');
let sass = require('gulp-sass');
let pug = require('gulp-pug');
let browserSync = require('browser-sync').create();
// paths config object
let paths = {
  src: 'src',
  public: 'dist',
  scss: 'src/scss/**/*.+(scss|sass)',
  scssOut: 'dist/css',
  pug: 'src/views/*.pug'
}
//dev server
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: paths.public
    }
  })
})
gulp.task('sass', () => {
  return gulp.src(paths.scss)
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(paths.scssOut))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('pug', () => {
  return gulp.src(paths.pug)
    .pipe(pug()) // renders pug to html
    .pipe(gulp.dest(paths.public))
    .pipe(browserSync.reload({
      stream: true
    }))
});


/// Watchers
let beforeTasks = 'browserSync|pug|sass'
let afterTasks = 'pug|sass'
gulp.task('watch', beforeTasks.split('|'), () => {
  gulp.watch(paths.src, afterTasks.split('|'))
})
