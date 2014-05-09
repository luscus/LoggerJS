module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'mochaTest', 'uglify']);


  // Plugin configuration(s).
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build/'],
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    concat: {
      standard: {
        files: {
          'build/loggerjs.skeleton.js': [
            'bower_components/cryptojs/rollups/sha1.js',
            'src/core/**/*.js',
            'src/entry/**/*.js',
            'src/task/**/*.js',
            'src/logger/**/*.js'
          ],
          'build/loggerjs.env.js': [
            'build/loggerjs.skeleton.js',
            'src/environment/**/*.js',
            'src/module.js'
          ],
          'build/loggerjs.test.js': [
            'src/test_header.part',
            'build/loggerjs.env.js',
            'src/test_footer.part'
          ],
          'build/loggerjs.js': [
            'src/header.part',
            'build/loggerjs.env.js',
            'src/footer.part'
          ]
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    uglify: {
      standard: {
        files: {
          'build/loggerjs.min.js': 'build/loggerjs.js'
        }
      }
    }
  });
};
