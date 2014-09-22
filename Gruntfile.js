/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
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
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    ts: {
      // A specific target
      build: {
        // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
        src: ["./scripts/**/*.ts"],
        // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support
        reference: "./scripts/reference.ts",
        options: {
          // 'es3' (default) | 'es5'
          target: 'es5',
          // 'amd' (default) | 'commonjs'
          module: 'amd',
          // true (default) | false
          sourceMap: true,
          // true | false (default)
          declaration: false,
          // true (default) | false
          removeComments: true,
          watch: "scripts"
        },
      }
    },
    less: {
      development: {
        options: {
          paths: ["content"]
        },
        files: {
          "content/site.css": "content/site.less"
        }
      },
      production: {
        options: {
          paths: ["content"],
          cleancss: true
        },
        files: {
          "content/site.css": "content/site.less"
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: 'scripts/**/*.ts',
        tasks: ['ts'],
        options: {
          interrupt: true,
        },
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-less');
  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'ts']);

};
