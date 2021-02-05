/* 
	* Gulp imports
*/
const
	gulp = require('gulp'), // Gulp core
	notify = require('gulp-notify'),
	rename = require('gulp-rename'), // Renamer
	sourcemaps = require('gulp-sourcemaps'), // Sourcemaps support
	sass = require('gulp-sass'), // SCSS compiler
	postcss = require('gulp-postcss'), // PostCSS compiler
	cleanCSS = require('gulp-clean-css') // CSS Minifier

const { config } = require('./config');

const compilePostCSS = () => {
	/* Add PostCSS plugins here */
	return postcss([ 
		// Autoprefixer
		require('autoprefixer')({ // Vendor prefixer
			// options
		}),
		require('postcss-font-awesome')
	])
}

const cssdev = () => {
	return gulp.src(config.paths.scss.src)
	.pipe(sourcemaps.init()) // Initialization of sourcemaps
	.pipe(sass()
		.on('error', 
			notify.onError({ title: "SASS compile error" })
		)
	) // Compile SASS
	.pipe(compilePostCSS()) // Compile PostCSS
	.pipe(sourcemaps.write()) // Write sourcemaps
	.pipe(rename(config.paths.scss.dest.filename)) // Set filename
	.pipe(gulp.dest(config.paths.scss.dest.folder)) // Write file
}

const cssprod = () => {
	return gulp.src(config.paths.scss.src)
	.pipe(sass()
		.on('error', 
			notify.onError({ title: "CSS not compliled ⚠️" })
		)
	) // Compile SASS
	.pipe(compilePostCSS())
	.pipe(cleanCSS({ level:{1: { specialComments: 0 }}}))
	.pipe(rename(config.paths.scss.dest.filename))
	.pipe(gulp.dest(config.paths.scss.dest.folder))
	.pipe(notify("CSS Compiled! 🎉"))
}

gulp.task('css-watch', () => {
	cssdev();
	console.info("Watching...")
	gulp.watch([config.paths.scss.watch], cssdev)
})

gulp.task('css', done => {
	cssprod();
	done();
})

gulp.task('default', gulp.series('css'));