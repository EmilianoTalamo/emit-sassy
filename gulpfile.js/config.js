/* 
	* Gulp configs
*/
const paths = {
	scss: {
		src: 'scss/style.scss', // Source SASS file
		dest: {
			folder: 'css/', // Destination folder for the compiled file
			filename: 'style.css' // Compiled filename
		},
		watch: 'scss/**' // Files to watch
	}
}

module.exports.config = {
	paths
}