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

    htmlmin: {
       dist: {
         options: {
           removeComments: true,
           collapseWhitespace: true,
           removeScriptTypeAttributes: true,
           removeIgnored: true,
           minifyJS: true,
           minifyCSS: true,
         },
         files: [{
                expand: true,
                cwd: 'build/sections',
                src: '**/*.html',
                dest: 'build/sections'
            }]
       }
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

  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['ejs','htmlmin','copy','clean']);

};
