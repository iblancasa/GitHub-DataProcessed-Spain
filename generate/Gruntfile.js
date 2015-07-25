module.exports = function(grunt) {
  grunt.initConfig({
    opt: grunt.file.readJSON('options.json'),
    ejs: {
      all: {
        options: '<%= opt %>',
        src: ['sections/*.ejs'],
        dest: 'dist',
        expand: true,
        ext: '.html',
      },
    }
  });


  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['ejs']);

};
