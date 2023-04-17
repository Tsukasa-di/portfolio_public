// //////////////////////////////
//  packages
// //////////////////////////////

const DEL               = require('delete');
const gulp              = require('gulp');
const SITEMAP           = require('./src/js/_libs/node_modules/sitemap');
const IMAGEMIN          = require('gulp-imagemin');

// //////////////////////////////
//  Definition
// //////////////////////////////

const paths = {
  src: './src',
  public: './public'
}

// //////////////////////////////
//  Clean
// //////////////////////////////

function Clean(cb) {
  DEL([paths.public + '/*']);
  cb();
}

// //////////////////////////////
//  DestAssets
// //////////////////////////////

function DestAssets(cb) {
  gulp
    .src([paths.src + '/assets/**/*.{jpg,jpeg,png,gif,svg,mp3,wav,mp4,mov}'])
    .pipe(gulp.dest(paths.public + '/assets/'));
  gulp
    .src([paths.src + '/data/*.json'])
    .pipe(gulp.dest(paths.public + '/data/'));
  cb();
};

// //////////////////////////////
//  ImageMin
// //////////////////////////////

function ImageMinify(cb) {
  gulp
    .src([paths.src + '/assets/**/*.{jpg,jpeg,png,gif,svg}', '!' + paths.src + '/assets/models'])
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
    .pipe(gulp.dest(paths.public + '/assets/'));
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
  DestAssets,
  Sitemap
);

exports.assets = gulp.series(
  DestAssets
);
