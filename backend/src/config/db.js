import dns from 'dns';
import mongoose from 'mongoose';
import { config } from './env.js';

// Configure DNS fallback so MongoDB Atlas SRV records resolve reliably across local ISP/router DNS
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Fallback gracefully if setServers is restricted
}

// Track connection lifecycle events once
let listenersAttached = false;
function setupConnectionListeners() {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on('error', (err) => {
    console.error('[MongoDB Error]:', err.message || err);
  });

  mongoose.connection.on('disconnected', () => {
    if (!config.isTest) {
      console.warn('[MongoDB Warning]: Database connection disconnected. Attempting auto-reconnect...');
    }
  });

  mongoose.connection.on('reconnected', () => {
    if (!config.isTest) {
      console.log('[MongoDB]: Database connection successfully re-established.');
    }
  });
}

/**
 * Connect to MongoDB instance using Mongoose with production connection pooling.
 * 
 * @param {string} [uri] - Optional MongoDB URI override (e.g. for testing)
 * @param {number} [maxRetries=3]
 * @returns {Promise<typeof mongoose>}
 */
export async function connectDB(uri = config.mongodbUri, maxRetries = 3) {
  setupConnectionListeners();

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, {
        autoIndex: !config.isProduction,
        maxPoolSize: 50,
        minPoolSize: 5,
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 45000,
      });

      if (!config.isTest) {
        console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
      }

      return conn;
    } catch (error) {
      console.error(`[MongoDB] Connection attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      if (attempt < maxRetries && !config.isTest) {
        console.log(`[MongoDB] Retrying in 2 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        if (!config.isTest) {
          console.error('[MongoDB] All connection attempts failed. Please verify network access, IP whitelist, and credentials.');
          process.exit(1);
        }
        throw error;
      }
    }
  }
}

/**
 * Gracefully close database connection.
 */
export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    if (!config.isTest) {
      console.log('[MongoDB] Disconnected.');
    }
  }
}

export default { connectDB, disconnectDB };
