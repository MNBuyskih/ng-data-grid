module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            templates: {
                files: 'src/**/*.html',
                tasks: 'ngtemplates'
            }
        },

        ngtemplates: {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                module: "ngDataGrid",
            },
            compile: {
                cwd: 'src',
                src: "**/*.html",
                dest: "src/ng-data-grid-tpl.js"
            }
        },

        concat: {
            compile: {
                src: ["src/ng-data-grid.js", "src/ng-data-grid-tpl.js"],
                dest: "dest/ng-data-grid.js"
            }
        },

        uglify: {
            compile: {
                files: {
                    "dest/ng-data-grid.min.js": "dest/ng-data-grid.js"
                }
            }
        },

        browserSync: {
            bsFiles: {
                src: 'test/**/*'
            },
            options: {
                watchTask: true,
                server: "./"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', ['ngtemplates', 'concat', 'uglify']);
};