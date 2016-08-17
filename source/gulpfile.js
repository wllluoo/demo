var gulp = require('gulp');
var sass = require('gulp-sass-china');
var prefix=require('gulp-autoprefixer');
var wrap=require('gulp-wrap');
var browserSync=require('browser-sync');

gulp.task('browser-sync',['build','sass'] ,function(){//在此执行build sass
	browserSync({
		server:{
			baseDir:'..'
		}
	})
});
gulp.task('build',function(){
	gulp.src('pages/*.html')
		.pipe(wrap({src:"layout/default.html"}))
		.pipe(gulp.dest(".."));
});

gulp.task('sass', function(){
  gulp.src('styles/main.scss')
      .pipe(sass()).on('error',handleError)
      .pipe(prefix())
      .pipe(gulp.dest('../styles'))
      .pipe(browserSync.reload({stream:true}));
});

function handleError(err){
	console.log(err.toString());
	this.emit('end');
}
/*
gulp.task('cp',function(){
	gulp.src('index.html')
		.pipe(gulp.dest('..'));
});
*/
gulp.task("rebuild",['build'],function(){//在rebuild任务执行之前,先执行build
	browserSync.reload();
})

gulp.task('watch',function(){
	gulp.watch(['**/*.html'],['rebuild']); 
	gulp.watch(['styles/*.scss'],['sass']);
})

//gulp.task('default',['sass','cp','watch']);
gulp.task('default',['browser-sync','watch']);