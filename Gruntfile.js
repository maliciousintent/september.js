module.exports = function(grunt) {
  grunt.initConfig({

    connect: {
      server: {
        options: {
          base: '',
          port: 9999
        }
      }
    },

    'jasmine_node': {
      projectRoot: '.',
      requirejs: false,
      forceExit: true,
    },
    'watch': {}
  });

    // Loading dependencies
    for (var key in grunt.file.readJSON('package.json').devDependencies) {
      if (key !== 'grunt' && key.indexOf('grunt') === 0) grunt.loadNpmTasks(key);
    }

    grunt.registerTask('dev', ['connect', 'watch']);
    grunt.registerTask('test', ['connect', 'jasmine_node']);
  };