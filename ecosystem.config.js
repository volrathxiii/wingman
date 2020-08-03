module.exports = {
  apps : [{
    name: 'webserver',
    script: 'build/web.server.js',
    watch: ['build', 'public'],
    watch_delay: 1000,
    ignore_watch : ["node_modules","build/workers", 'tmp'],
    watch_options: {
      "followSymlinks": false
    }
  }, {
    name: 'socketserver',
    script: 'build/socket.server.js',
    watch: 'build/socket.server.js',
    watch_delay: 1000,
    ignore_watch : ["node_modules",'tmp'],
    watch_options: {
      "followSymlinks": false
    }
  },{
    name: 'stoplisten.worker',
    script: 'build/workers/stoplisten.js',
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
