module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'mochaTest', 'uglify']);
  grunt.registerTask('compile', ['clean', 'jshint', 'concat', 'uglify']);


  // Plugin configuration(s).
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build/', 'lib/'],
    jshint: {
      all: ['package.json', 'Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    concat: {
      standard: {
        files: {
          'build/loggerjs.skeleton.js': [
            'bower_components/cryptojs/rollups/sha1.js',
            'src/common/core/**/*.js',
            'src/common/entry/**/*.js',
            'src/common/task/**/*.js',
            'src/common/logger/**/*.js'
          ],
          'build/loggerjs.browser.env.js': [
            'build/loggerjs.skeleton.js',
            'src/specific/browser/**/*.js',
            'src/common/module.js'
          ],
          'build/loggerjs.browser.test.js': [
            'src/common/test_header.part',
            'build/loggerjs.browser.env.js',
            'src/common/test_footer.part'
          ],
          'lib/browser/logger.js': [
            'src/specific/browser/header.part',
            'build/loggerjs.browser.env.js',
            'src/specific/browser/footer.part'
          ],
          'lib/angular/angular-logger.js': [
            'src/specific/browser/header.part',
            'build/loggerjs.browser.env.js',
            'src/specific/browser/footer.part',
            'src/specific/angular/footer.part'
          ],
          'build/loggerjs.node.env.js': [
            'src/specific/node/header.part',
            'build/loggerjs.skeleton.js',
            'src/specific/node/**/*.js',
            'src/module.js',
            'src/specific/node/footer.part'
          ],
          'lib/node/logger.js': [
            'src/header.part',
            'build/loggerjs.node.env.js',
            'src/footer.part'
          ]
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'dot'
        },
        src: ['test/**/*.js']
      }
    },
    uglify: {
      standard: {
        files: {
          'lib/browser/logger.min.js': 'lib/browser/logger.js',
          'lib/angular/angular-logger.min.js': 'lib/angular/angular-logger.js'
        }
      }
    }
  });
};
