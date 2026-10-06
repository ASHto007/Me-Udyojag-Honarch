import http from 'http';
import { app } from './app.js';
import { config } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

let server;

async function bootstrap() {
  try {
    await connectDB();

    server = http.createServer(app);

    server.listen(config.port, () => {
      console.log(`===============================================`);
      console.log(` Mi Udyojak Honarach Backend Server`);
      console.log(` Environment : ${config.env}`);
      console.log(` Port        : ${config.port}`);
      console.log(` Healthcheck : http://localhost:${config.port}/api/health`);
      console.log(` Swagger Docs : http://localhost:${config.port}/api/docs`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('Fatal bootstrapping error:', error);
    process.exit(1);
  }
}

// Graceful termination handling
const shutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Gracefully closing server and database connections...`);
  if (server) {
    server.close(async () => {
      await disconnectDB();
      console.log('HTTP server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

bootstrap();
