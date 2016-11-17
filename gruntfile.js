/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        injector: {
            local_dependencies: {
                files: {
                    'www/index.html': ['www/lib/angular/angular.min.js',
                                          'www/lib/angular/jquery.min.js',
                                          'www/app/core/views.glory.js',
                                          'www/js/**/*.js', 'www/css/**/*.css']
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

    // grunt.registerTask('default', ['clean', 'ngtemplates', 'copy:main', 'injector']);
    // grunt.registerTask('unit', ['ngtemplates', 'copy:unit', 'karma:unit', 'clean:unit']);
    // Default task.
    grunt.registerTask('default', ['ngtemplates','injector']);
    grunt.registerTask('unit', ['karma']);
    //grunt.registerTask('changes', ['watch']);
};
