module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // commonjs to module for browser
  grunt.loadNpmTasks('grunt-browserify')

  grunt.initConfig({
    // Configure a mochaTest task https://github.com/pghalliday/grunt-mocha-test
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          //captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/**/*.js']
      }
    },
    browserify: {
        build: {
            options: {
                standalone: "app"
            },
            src: './index.js',
            dest: './bstree.src.js'
        }
    },
    uglify: {
        dist: {
            src: './bstree.src.js',
            dest: './bstree.min.js'
        }           
    },
  });

  grunt.registerTask('default', 'mochaTest');
  grunt.registerTask('test', 'mochaTest');

};