/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        injector: {
            local_dependencies: {
                files: {
                    'www/index.html': ['www/lib/**/*.js',
                                        'www/app/core/**/*.js',
                                        'www/app/controllers/**/*.js',
                                        'www/app/directives/**/*.js',
                                        'www/app/services/**/*.js',
                                       'www/css/materialize.css',
                                       'www/css/animate.css',
                                       'www/css/ionic.app.css',
                                       'www/css/design.css',
                                       'www/css/match.css',
                                       'www/css/feed.css'
                                      ]
                },
                options:{
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
        concat: {
          options: {
            separator: ';',
          },
          distJS: {
            src: ['www/lib/angular/angular.min.js',
                  'www/lib/angular/jquery.min.js',
                  'www/app/core/views.glory.js',
                  'www/js/**/*.js']
            dest: 'www/lib/ttg-final.min.js',
          },
          distCSS: {
            src: ['www/css/**/*.css']
            dest: 'www/css/styles.min.js',
          },
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.registerTask('default', ['clean', 'ngtemplates', 'copy:main', 'injector']);
    // grunt.registerTask('unit', ['ngtemplates', 'copy:unit', 'karma:unit', 'clean:unit']);
    // Default task.
    grunt.registerTask('default', ['ngtemplates','injector:dev']);
    grunt.registerTask('prod', ['ngtemplates','concat','injector:prod']);
    grunt.registerTask('unit', ['karma']);
    //grunt.registerTask('changes', ['watch']);
};
