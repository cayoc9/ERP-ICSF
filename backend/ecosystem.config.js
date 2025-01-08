module.exports = {
  apps: [{
    name: "erp-backend",
    script: "app.js",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "production",
      PORT: 5000,
      HOST: '0.0.0.0'  // Adicione esta linha
    }
  }]
}