/* globals process: fasle */
var _ = require('lodash'), // jshint ignore:line
	gulp = require('gulp'),
	less = require('gulp-less'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	to5Browserify = require('6to5-browserify'),
	rimraf = require('rimraf'),
	source = require('vinyl-source-stream'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;


var config = {
	assets: "./assets/**/*",
	js: {
		vendor: ["./node_modules/phaser/dist/phaser.js"],
		entry: './src/app.js',
		outputFile: 'app.js'
	},
	less: {
		entry: './less/style.less',
		all: './less/**/*.less'
	},
	distDir: './dist/',
	serverBase: './'
};


// clean the output directory
gulp.task('clean', function(cb){
	rimraf(config.distDir, cb);
});

var bundler;
function getBundler() {
	if (!bundler) {
		bundler = watchify(browserify(config.js.entry, _.extend({ debug: true }, watchify.args)));
	}
	return bundler;
}

function bundle() {
	return getBundler()
		.transform(to5Browserify)
		.bundle()
		.on('error', function(err) { console.log('Error: ' + err.message); })
		.pipe(source(config.js.outputFile))
		.pipe(gulp.dest(config.distDir))
		.pipe(reload({ stream: true }));
}

gulp.task('assets', function () {
	return gulp.src(config.assets).pipe(gulp.dest(config.distDir + 'assets'));
});

gulp.task('build-js', function() {
	if(config.js.vendor){
		gulp.src(config.js.vendor).pipe(gulp.dest(config.distDir  + 'vendor'))
	}
	return bundle();
});

gulp.task('build-less', function(){
	return gulp.src(config.less.entry)
		.pipe(less())
		.pipe(gulp.dest(config.distDir));
});

gulp.task('build', ['clean', 'assets', 'build-js', 'build-less'], function() {
	process.exit(0);
});

gulp.task('dev', ['clean'], function() {
	gulp.start('assets');
	gulp.start('build-js');
	gulp.start('build-less');
	browserSync({
		server: {
			baseDir: config.serverBase
		}
	});

	getBundler().on('update', function() {
		gulp.start('build-js');
	});

	gulp.watch(config.less.all, ['build-less']);
});

// WEB SERVER
gulp.task('serve', function () {
	browserSync({
		server: {
			baseDir: config.serverBase
		}
	});
});
