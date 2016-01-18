module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/scripts/analytics.js',
                dest: 'server/public/assets/scripts/analytics.min.js'
            },
            controllers: {
                src: "client/scripts/controllers/controller.js",
                dest: "server/public/assets/scripts/controllers/controller.min.js"
            }
        },
        copy: {
            style: {
                expand: true,
                cwd: 'client',
                src: [
                    "styles/*"
                ],
                "dest": "server/public/assets"
            },
            assets: {
                expand: true,
                cwd: 'client',
                src: [
                    "images/*"
                ],
                "dest": "server/public/assets"
            },
            views: {
                expand: true,
                cwd: 'client',
                src: [
                    "views/*"
                ],
                "dest": "server/public/assets"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};