/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    concat: {
      dist: {
        src: [
          "libs/almond.js",
          "<config:requirejs.compile.options.out>"
        ],
        dest: "dist/app.concat.js"
      }
    },

    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'dist/app.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        require: true,
        define: true

      }
    },
    uglify: {},
    requirejs: {
      compile: {
        options: {
          name: "config",
          baseUrl: "src",
          mainConfigFile: "src/config.js",
          out: "dist/app.opt.js"
        }
      }
    }
  });

  //first: lint everything
  //second: run qunit tests
  //third: use requirejs to load modules
  //fourth: concat loaded modules with almond.js
  //fith: minify
  grunt.registerTask('default', 'lint qunit requirejs concat min');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

};
