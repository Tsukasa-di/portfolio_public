// //////////////////////////////
//  packages
// //////////////////////////////

const DEL               = require('delete');
const gulp              = require('gulp');
const SITEMAP           = require('./src/js/_libs/gulp/sitemap');
const IMAGEMIN          = require('gulp-imagemin');

// //////////////////////////////
//  Definition
// //////////////////////////////

const paths = {
  src: './src',
  public: './public'
};

// //////////////////////////////
//  Clean
// //////////////////////////////

function Clean(cb) {
  DEL([paths.public + '/*', '!' + paths.public + '/assets'], cb);
};

// //////////////////////////////
//  StaticDest
// //////////////////////////////

function StaticDest(cb) {
  gulp
    .src(paths.src + '/favicon.ico')
    .pipe(gulp.dest(paths.public + '/'))
  gulp
    .src([paths.src + '/contents/**/*.json'])
    .pipe(gulp.dest(paths.public + '/contents/'))
  gulp
    .src([paths.src + '/assets/**/*.mp3'])
    .pipe(gulp.dest(paths.public + '/assets'))
  gulp
    .src([paths.src + '/assets/models/**'])
    .pipe(gulp.dest(paths.public + '/assets/models'))
  cb();
};

// //////////////////////////////
//  MinifyImages
// //////////////////////////////

function MinifyImages(cb) {
  gulp
    .src([paths.src + '/assets/images/**/*.{jpg,jpeg,png,gif,svg}', '!' + paths.src + '/assets/models'])
    .pipe(IMAGEMIN([
      IMAGEMIN.gifsicle({ interlaced: true }),
      IMAGEMIN.mozjpeg({ quality: 75, progressive: true }),
      IMAGEMIN.optipng({ optimizationLevel: 5 }),
      IMAGEMIN.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest(paths.public + '/assets/images'));
  cb();
};

// //////////////////////////////
//  Sitemap
// //////////////////////////////

function Sitemap(cb) {
  SITEMAP(paths);
  cb();
}

// //////////////////////////////
//  Tasks
// //////////////////////////////

exports.default = gulp.series(
  Clean,
  Sitemap,
  StaticDest
);

exports.images = gulp.series(
  MinifyImages
);

exports.sitemap = gulp.series(
  Sitemap
);
