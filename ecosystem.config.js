module.exports = {
  apps: [
    {
      name: 'population-comparison',
      script: './src/server.js',
      instance_var: 'INSTANCE_ID',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
