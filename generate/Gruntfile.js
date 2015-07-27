
module.exports = function(grunt) {
  var mozjpeg = require('imagemin-mozjpeg');
  var fs = require('fs')


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

    uncss: {
        dist: {
          files: {
            'assets/css/min.css': ['../**\.html']
          }
        }
      },

    processhtml: {
      deploy:{
        options: {
          process: false,
        },
        files: [
          {
          expand: true,
          cwd: '../',
          src: ['**/*.html'],
          dest: '../'
        }
        ]
      }
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
                cwd: '../',
                src: '*.html',
                dest: '../'
            }]
       }
    },

    cssmin: {
        dist: {
          files: [{
                 expand: true,
                 cwd: 'assets/css',
                 src: '**/*.css',
                 dest: '../assets/css'
             },
           {
                  expand: true,
                  cwd: '../assets/css',
                  src: 'min.css',
                  dest: '../assets/css'
              }]
        }
      },

    uglify: {
        options: {
          mangle: false
        },
        dist: {
          files: [{
                 expand: true,
                 cwd: 'assets/js',
                 src: '**/*.js',
                 dest: '../assets/js'
             },
             {
                  expand: true,
                  cwd: 'js',
                  src: '**/*.js',
                  dest: '../js'
              }]
        }
      },



      imagemin: {
          static: {
            options: {
              optimizationLevel: 3,
              svgoPlugins: [{ removeViewBox: false }],
              use: [mozjpeg()]
            },
            files: [{
              expand: true,
              cwd: '../images',
              src: ['**/*.{png,jpg,gif}'],
              dest: '../images'
            },
            {
              expand: true,
              cwd: 'assets/css/images/',
              src: ['**/*.{png,jpg,gif}'],
              dest: '../assets/css/images/'
            }
            ]
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
         },
         {
           expand : true,
           dest   : '../assets',
           cwd    : 'assets',
           src    : [
             'fonts/**','sass/**','js/ie/backgroundsize.min.htc','js/ie/PIE.htc'
           ]
         },
       ]
     }
   },

   clean: ["build/**/*","build"]
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-uncss');

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);



  grunt.registerTask('addClass', 'Add removed classes by uncss', function() {
    var done = this.async();
    fs.readFile('../assets/css/min.css', 'utf8', function (err,data) {
      data += "table tbody tr:nth-child(2n + 1) {background-color: #DCDCDC;} table td {padding: 0.75em 0.75em;}";
      fs.writeFile("../assets/css/min.css",data, function(err) {
          if(err) {
              return console.log(err);
          }
          grunt.log.write('Adding class removed by uncss').ok();
           done(true);
      });
    });
  });

  grunt.registerTask('default', ['ejs','copy','clean','uncss','processhtml','htmlmin','cssmin','uglify','addClass','imagemin']);

};
