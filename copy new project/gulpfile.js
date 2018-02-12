var gulp = require('gulp');
var compass   = require('gulp-compass');
var htmlmin = require('gulp-htmlmin'); 
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-ruby-sass');

// gulp.task('style', function() {
//    return gulp.src('src/css/*.css')    //所有要壓縮的 .css 檔案
//     .pipe(cleanCSS({compatibility: 'ie8'}))    //將 css 最小化
//     .pipe(concat('style.min.css'))    //將所有 css 合併成 style.min.css
//     .pipe(gulp.dest('dist/css'))    //壓縮後檔案輸出位置
//     .pipe(browserSync.stream());    // 瀏覽器同步
// });



gulp.task('html', function() {
  return gulp.src('*.html')    //所有要壓縮的 .html 檔案
    .pipe(htmlmin({collapseWhitespace: true}))    //去除檔案裡多餘的空格
    .pipe(gulp.dest('dist'))    //壓縮後檔案輸出位置
    .pipe(browserSync.stream());    // 瀏覽器同步
});

gulp.task('script', function () {
  return gulp.src('js/*.js')    //所有要壓縮的 .js 檔案
    .pipe(uglify())    //將 JavaScript 最小化
    // .pipe(concat('main.min.js')) //將所有 js 合併成 main.min.css
    .pipe(gulp.dest('dist/js'))    //壓縮後檔案輸出位置
    .pipe(browserSync.stream());    // 瀏覽器同步
});

gulp.task('image', function() {  
  return gulp.src('images/*')    //所有要壓縮的圖片檔案
    .pipe(imagemin())    // 圖片最小化
    .pipe(gulp.dest('dist/images'));    //壓縮後檔案輸出位置
});

gulp.task('browsersync', function () {
  browserSync.init({
    server: "./dist" //要瀏覽器同步的資料夾
  });
});

gulp.task('watch', function() {
  gulp.watch('/*.html', ['html']) //監看所有 html 檔案，檔案有更動時就執行 task html
  gulp.watch('./sass/*.scss',['compass']);
  gulp.watch('/js/*.js', ['script']); //監看所有 js 檔案，檔案有更動時就執行 task script
});

gulp.task('compass',function(){
    return gulp.src('./sass/*.scss')
        .pipe(compass({
            sourcemap: true,
            time: true,
            require: ['susy', 'breakpoint'],
      css: './css/',
      sass: './sass/',
      style: 'compact' //nested, expanded, compact, compressed
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', 
  ['watch','compass','browsersync','html','script', 'image']
);