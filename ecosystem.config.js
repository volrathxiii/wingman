module.exports = {
  apps : [{
    name: 'web.server',
    script: 'build/web.server.js',
    watch: ['build', 'public'],
    watch_delay: 1000,
    ignore_watch : ["node_modules","build/workers", "build/memory",'tmp'],
    watch_options: {
      "followSymlinks": false
    }
  }, {
    name: 'socket.server',
    script: 'build/socket.server.js',
    watch: ['build'],
    watch_delay: 1000,
    ignore_watch : ["node_modules",'tmp'],
    watch_options: {
      "followSymlinks": false
    }
  },{
    name: 'memory.server',
    script: 'build/memory/index.js',
    watch: ['build/memory'],
    watch_delay: 1000,
    ignore_watch : ["node_modules", 'tmp'],
    watch_options: {
      "followSymlinks": false
    }
  },{
    name: 'stoplisten.worker',
    script: 'build/workers/stoplisten.worker.js',
    watch: ['build/workers'],
    watch_delay: 1000,
    ignore_watch : ["node_modules", 'tmp'],
    watch_options: {
      "followSymlinks": false
    }
  },],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
