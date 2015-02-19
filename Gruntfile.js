module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "js/init.js",
                    name: "init",
                    include: ['init'],
                    exclude: ['jquery','jquery-ui'],
                    out: "build/js/production.js"
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'build/js/lib/require.min.js': 'build/js/lib/require.min.js'
                }
            }
        },
        csso: {
            main: {
                files: {
                    'build/css/main.min.css': ['css/compiled/main.css']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: 'index.html',
                        dest: 'build/index.html'
                    },
                    {
                        src: 'bower_components/jquery/dist/jquery.min.js',
                        dest: 'build/js/lib/jquery.min.js'
                    },
                    {
                        src: 'bower_components/jquery-ui/jquery-ui.min.js',
                        dest: 'build/js/lib/jquery-ui.min.js'
                    },
                    {
                        src: 'bower_components/requirejs/require.js',
                        dest: 'build/js/lib/require.min.js'
                    }
                ]
            }
        },
        replace: {
            index: {
                src: ['build/index.html'],
                overwrite: true,
                replacements: [
                    {
                        from: /js\/init/i,
                        to: "js/production.js"
                    },
                    {
                        from: /css\/compiled\/main.css/i,
                        to: "css/main.min.css"
                    },
                    {
                        from: /bower_components\/requirejs\/require.js/i,
                        to: "js/lib/require.min.js"
                    }
                ]
            },
            code: {
                src: ['build/js/production.js'],
                overwrite: true,
                replacements: [
                    {
                        from: /..\/bower_components\/jquery\/dist\/jquery.min/i,
                        to: "lib/jquery.min"
                    },
                    {
                        from: /..\/bower_components\/jquery-ui\/jquery-ui.min/i,
                        to: "lib/jquery-ui.min"
                    }
                ]
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('build', ['copy', 'uglify', 'requirejs', 'csso', 'replace']);
};