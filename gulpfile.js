let gulp = require('gulp');
let sass = require('gulp-sass');
let pug = require('gulp-pug');
let browserSync = require('browser-sync').create();
// paths config object
let paths = {
  public: 'dist',
  scss: 'src/scss/**/*.+(scss|sass)',
  scssOut: 'dist/css',
  pug: 'src/views/index.pug'
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
    .pipe(pug(pugOptions)) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(paths.scssOut))
    .pipe(browserSync.reload({
      stream: true
    }))
});


/// Watchers
let tasks = 'browserSync|sass'
gulp.task('watch', tasks.split('|'), () => {
  gulp.watch(paths.scss, ['sass'])
})
