module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);


  // Plugin configuration(s).
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build/', "docs/"],
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    concat: {
      standard: {
        files: {
          'build/loggerjs.skeleton.js': [
            'bower_components/cryptojs/rollups/sha1.js',
            'src/log_levels.js',
            'src/errorParser.js',
            'src/entry/entry_header.tmpl',
            'src/entry/LogEntry.js',
            'src/entry/entry_footer.tmpl',
            'src/task/LogTask.js',
            'src/logger/ConsoleWrapper.js',
            'src/logger/Logger.js'
          ],
          'build/loggerjs.js': [
            'src/logger/logger_header.tmpl',
            'build/loggerjs.skeleton.js',
            'src/environment/**/*.js',
            'src/logger/logger_footer.tmpl'
          ]
        }
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
