import http from 'http';
import { app } from './app.js';
import { config } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

let server;

async function bootstrap() {
  try {
    await connectDB();

    server = http.createServer(app);

    // Keep-alive timeouts tailored for reverse proxies (Nginx, ALB, Cloudflare, Render)
    server.keepAliveTimeout = 65000;
    server.headersTimeout = 66000;

    server.listen(config.port, () => {
      console.log(`===============================================`);
      console.log(` Mi Udyojak Honarach Backend Server`);
      console.log(` Environment : ${config.env}`);
      console.log(` Port        : ${config.port}`);
      console.log(` Healthcheck : http://localhost:${config.port}/api/health`);
      console.log(` Swagger Docs: http://localhost:${config.port}/api/docs`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('Fatal bootstrapping error:', error);
    process.exit(1);
  }
}

// Graceful termination handling with forced timeout safeguard
let isShuttingDown = false;
const shutdown = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\nReceived ${signal}. Gracefully closing server and database connections...`);

  // Force exit if connections do not close cleanly within 10 seconds
  const forceExitTimeout = setTimeout(() => {
    console.error('Forced shutdown: Timed out waiting for active connections to close.');
    process.exit(1);
  }, 10000);
  forceExitTimeout.unref();

  if (server) {
    server.close(async (err) => {
      if (err) {
        console.error('Error closing HTTP server:', err);
      } else {
        console.log('HTTP server closed.');
      }
      try {
        await disconnectDB();
      } catch (dbErr) {
        console.error('Error closing database connection:', dbErr);
      }
      process.exit(0);
    });
  } else {
    try {
      await disconnectDB();
    } catch {
      // ignore
    }
    process.exit(0);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection] at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[Uncaught Exception]:', error);
  shutdown('uncaughtException');
});

bootstrap();
