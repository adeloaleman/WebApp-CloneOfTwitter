module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'TwitterClone',
      script    : 'npx',
      interpreter: "none",
      args      : 'run start:production',
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],
};
