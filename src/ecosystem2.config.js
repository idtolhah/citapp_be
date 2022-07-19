module.exports = {
    apps : [
    {
      name      : "Main API server",
      script    : "./server.js",
      instances : "2",
      exec_mode : "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 5001    
      }
    },
    {
      name      : "Worker server 1",
      script    : "./server.js",
      instances : "1",
      exec_mode : "fork",
      env: {
        NODE_ENV: "development",
        PORT: 5002,
      },
    },
    {
      name      : "Worker server 2",
      script    : "./server.js",
      instances : "1",
      exec_mode : "fork",
      env: {
        NODE_ENV: "development",
        PORT: 5003,
      }
    },
    ]
  }