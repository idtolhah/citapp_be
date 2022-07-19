module.exports = {
  apps : [{
    name   : "sm-ems",
    script : "./server.js",
    env_production: {
       PORT: 5001,
    },
  }]
}