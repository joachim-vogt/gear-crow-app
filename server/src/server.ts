import 'dotenv/config';

// This file serves as the entry point to start the API server
import app from './app';
import { Server } from 'http';
import {
  authenticate_database_reachability,
  close_database_connection,
} from './database/connection';
import validated_env from './utilities/validate_env_values';

let server: Server;
const PORT = validated_env('SERVER_PORT') || 5000;

// Server and database connection start
const start_server = async () => {
  server = app.listen(PORT, () => {
    console.log(`✅ HTTP Server started. Listening on port ${PORT}.`);
  });

  await authenticate_database_reachability();
};
start_server().catch((error) => {
  console.error('❌ Error starting server: ', error);
  process.exit(1);
});

// Shutdown handling with terminal flush
const shutdown_server = async (signal: string) => {
  const shutdownTiming = Date.now();
  console.log(`
    Shutdown signal ${signal} received.
    Closing HTTP server and database connection...
    `);
  try {
    server.close(async () => {
      await close_database_connection();

      // DEV_NOTE: Other cleanup tasks can be performed here when needed.
      // Examples:
      // - Redis connections
      // - Background jobs
      // - Message queues etc.
      console.log('✅ HTTP server closed.');

      const shutdownDuration: number = Date.now() - shutdownTiming;
      console.log(`⌛ Shutdown duration: ${shutdownDuration}ms`);

      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error during shutdown: ', error);
    setTimeout(() => process.exit(1), 300);
  }
};

process.on('SIGTERM', () => shutdown_server('SIGTERM'));
process.on('SIGINT', () => shutdown_server('SIGINT'));
process.on('SIGUSR2', () => shutdown_server('SIGUSR2')); // For nodemon restarts
