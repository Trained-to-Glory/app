/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    var config = {
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        js_files: ['www/lib/angular/angular.js',
        'www/lib/jquery/dist/jquery.js',
        'www/lib/ionic/js/ionic.bundle.js',
        'www/lib/ionic-platform-web-client/dist/ionic.io.bundle.js',
        'www/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',
       'www/lib/angular-filter/dist/angular-filter.js',

       //First Half
       'www/lib/ngCordova/dist/ng-cordova.js',
       'www/lib/ng-lodash/build/ng-lodash.js',
       'www/lib/ion-floating-menu/dist/ion-floating-menu.js',
       'www/lib/ngstorage/ngStorage.js',
       'www/lib/ionic-scroll-sista/dist/ionic.scroll.sista.js',
       'www/lib/ngprogress/build/ngprogress.js',
       'www/lib/ionic-image-lazy-load/ionic-image-lazy-load.js',
       'www/lib/ionic-cache-src/ionic-cache-src.js',
       'www/lib/angular-images-loaded-jtt/angular-images-loaded-directive.js',
       'www/lib/angular-svg-round-progressbar/build/roundProgress.min.js',
       'www/app/*.js',
       'www/app/services/service.interest.js',
        'www/app/services/service.post.js',
        //users is the broken file
        'www/app/services/service.users.js',
       'www/app/services/service.appointments.js',
        'www/app/services/service.engagements.js',
       'www/app/controllers/*.js',
       'www/app/core/*.js',
       'www/app/directives/*.js',
      //  'www/app/services/*.js',
       //Second Half
       //'www/app/**/*.js',
     ],
        css_files: ['www/css/materialize.css',
        'www/css/animate.css',
        'www/css/ionic.app.css',
        'www/css/design.css',
        'www/css/match.css',
        'www/css/feed.css',
        'www/lib/ion-floating-menu/dist/ion-floating-menu.css',
        'www/lib/ngprogress/ngProgress.css'],
        concat: {
          options: {
            separator: ';',
          },
          distCSS: {
            dest: 'www/dist/<%= pkg.name %>.css',
          },
          distJS: {
            dest: 'www/dist/<%= pkg.name %>.js'
          },
        },
        uglify: {
          dist: {
              src: 'www/dist/<%= pkg.name %>.js',
              dest :'www/dist/<%= pkg.name %>.min.js'
          },
        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          }
        },
        injector: {
            dev: {
                files: {},
                options:{
                  transform: function (filePath) {
                      filePath = filePath.replace('/www/', '');
                      var isCss = filePath.indexOf('.css') > -1;
                      return isCss ? '<link rel="stylesheet" type="text/css" href="' + filePath + '" />': '<script src="' + filePath + '"></script>';
                  }

                }
            },
             prod: {
                 files: {
                     'www/index.html': ['www/dist/<%= pkg.name %>.min.css', 'www/dist/<%= pkg.name %>.min.js']
                 },
                 options:{
                   transform: function (filePath) {
                       filePath = filePath.replace('/www/', '');
                       var isCss = filePath.indexOf('.css') > -1;
                       return isCss ? '<link rel="stylesheet" type="text/css" href="' + filePath + '" />': '<script src="' + filePath + '"></script>';
                   },
                     ignorePath:[
                         'www/'
                    ],
                 }
             }
        },
        ngtemplates: {
            'views.glory': {
                src: 'www/app/**/*.html',
                dest: 'www/app/core/views.glory.js',
                options: {
                    standalone: true,
                    quotes: 'single',
                    url: function (url) { return url.replace('www/', ''); }
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        debug: {
          options: {
            open: false // do not open node-inspector in Chrome automatically
          }
        },
        clean: {
          all: ['www/dist/*']
        },
        jshint: {
            all: {
              options: {
                '-W015': true
              },
              src: 'www/app/services/service.users.js',
              filter: 'isFile'
            }
          }
    };
    config.concat.distCSS.src = config.css_files;
    config.concat.distJS.src = config.js_files;
    config.jshint.all.src = config.js_files;
    config.injector.dev.files = {
      'www/index.html': [config.js_files, config.css_files]
    };
    config.cssmin.target= {
      files: {
        'www/dist/<%= pkg.name %>.min.css': config.css_files
      }
    };
    grunt.initConfig(config);

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-debug-task');
    // grunt.registerTask('default', ['clean', 'ngtemplates', 'copy:main', 'injector']);
    // grunt.registerTask('unit', ['ngtemplates', 'copy:unit', 'karma:unit', 'clean:unit']);
    // Default task.
    grunt.registerTask('default', [ 'ngtemplates','injector:dev']);
    grunt.registerTask('prod', ['jshint','clean','ngtemplates','concat:distCSS', 'concat:distJS', 'uglify','cssmin','injector:prod']);
    grunt.registerTask('unit', ['karma']);
    //grunt.registerTask('changes', ['watch']);
};
