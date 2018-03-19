var gulp = require('gulp');
var gulpConcat = require('gulp-concat');


gulp.task('default',['extlibs']);


gulp.task('extlibs', function() {
	
	console.log('copying css');
	//gulp.src(['www/extlibs/*.css'])
	//.pipe(gulp.dest('www/build'));
	
	console.log('copying js');
    return gulp.src(['www/extlibs/*.js'],{base: 'www'})
        .pipe(gulpConcat('external-libraries.js'))
        .pipe(gulp.dest('www/build/js'));
});