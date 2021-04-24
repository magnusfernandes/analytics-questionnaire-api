module.exports = {
  apps: [{
    name: "survey-api",
    script: "build/server.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
      DB_CONN_STRING: "postgres://assistadmin:zzzpqow1029@localhost:5432/survey_production"
    }
  }],

  deploy: {
    production: {
      key: "../analyticsassist.pem",
      user: "ubuntu",
      host: "13.234.189.26",
      ref: "origin/main",
      repo: "git@github.com:magnusfernandes/analytics-questionnaire-api.git",
      path: "/home/ubuntu/apps/survey-api",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};