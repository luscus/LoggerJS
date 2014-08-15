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
    clean: ['build/'],
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
          'lib/loggerjs.browser.js': [
            'src/specific/browser/header.part',
            'build/loggerjs.browser.env.js',
            'src/specific/browser/footer.part'
          ],
          'lib/loggerjs.angular.js': [
            'src/specific/browser/header.part',
            'build/loggerjs.browser.env.js',
            'src/specific/browser/footer.part'
          ],
          'build/loggerjs.node.env.js': [
            'src/specific/node/header.part',
            'build/loggerjs.skeleton.js',
            'src/specific/node/**/*.js',
            'src/module.js',
            'src/specific/node/footer.part'
          ],
          'lib/loggerjs.node.js': [
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
          'lib/loggerjs.browser.min.js': 'lib/loggerjs.browser.js',
          'lib/loggerjs.angular.min.js': 'lib/loggerjs.angular.js'
        }
      }
    }
  });
};
