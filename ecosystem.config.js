module.exports = {
  apps : [{
    name: 'API',
    script: 'cluster.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy : {
    production : {
      user : 'router',
      host : '47.56.164.92',
      ref  : 'origin/master',
      repo : 'git@github.com:jindingyule/buid.git',
      path : '/opt/webroot/test',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
