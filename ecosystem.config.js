module.exports = {
  apps : [{
    name: 'memory.server',
    script: 'build/memory/index.js',
    watch: ['build/memory'],
    watch_delay: 1000,
    wait_ready: true,
    ignore_watch : ["node_modules", "build/workers",'tmp'],
    watch_options: {
      "followSymlinks": false
    },
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
        "NODE_ENV": "production",
    }
  },{
    name: 'socket.server',
    script: 'build/socket.server.js',
    watch: ['build'],
    watch_delay: 1000,
    wait_ready: true,
    ignore_watch : ["node_modules","build/workers","build/memory",'tmp'],
    watch_options: {
      "followSymlinks": false
    },
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
        "NODE_ENV": "production",
    }
  },{
    name: 'web.server',
    script: 'build/web.server.js',
    watch: ['build/web.server.js', 'public'],
    watch_delay: 1000,
    wait_ready: true,
    ignore_watch : ["node_modules","build/workers", "build/memory",'tmp'],
    watch_options: {
      "followSymlinks": false
    },
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
        "NODE_ENV": "production",
    }
  },{
    name: 'worker.server',
    script: 'build/worker.server.js',
    watch: ['build/worker.server.js',"build/workers"],
    watch_delay: 1000,
    wait_ready: true,
    ignore_watch : ["node_modules", 'tmp'],
    watch_options: {
      "followSymlinks": false
    },
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
        "NODE_ENV": "production",
    }
  },{
    name: 'listener.server',
    script: 'speech.listener.js',
    watch: ['build','speech.listener.js'],
    watch_delay: 1000,
    wait_ready: true,
    ignore_watch : ["node_modules","build/workers","build/memory",'tmp'],
    watch_options: {
      "followSymlinks": false
    },
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
        "NODE_ENV": "production",
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
