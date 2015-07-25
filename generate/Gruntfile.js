module.exports = function(grunt) {
  grunt.initConfig({
    opt: grunt.file.readJSON('options.json'),
    ejs: {
      all: {
        options: '<%= opt %>',
        src: ['sections/*.ejs'],
        dest: 'build',
        expand: true,
        ext: '.html',
      },
    },
    copy: {
     foo : {
       files : [
         {
           expand : true,
           dest   : '../',
           cwd    : 'build/sections',
           src    : [
             '**/*'
           ]
         }
       ]
     }
   },
   clean: ["build"]
  });


  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


   grunt.registerTask('default', ['ejs','copy','clean']);

};
