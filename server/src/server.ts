import 'dotenv/config';

// This file serves as the entry point to start the API server
import app from './app';
import { Server } from 'http';
import { establish_database_connection, close_database_connection } from './database/connection';
import validated_env from './utilities/validate_env_values';

let server: Server;
const PORT = validated_env('DB_PORT') || 5000;

// Server and database connection start
const start_server = async () => {
  server = app.listen(PORT, () => {
    console.log(`✅ HTTP Server started. Listening on port ${PORT}.`);
  });

  await establish_database_connection();
};
start_server().catch((error) => {
  console.error('❌ Error starting server: ', error);
  process.exit(1);
});

// Shutdown handling
const shutdown_server = async (signal: string) => {
  console.log(`${signal} received: Closing HTTP server and database connection...`);

  const forceExit = setTimeout(() => {
    console.log('❌ Server close timeout - forcing shutdown');
    process.exit(1);
  }, 5000);

  // Close HTTP server first to stop accepting new requests
  server.close(async () => {
    clearTimeout(forceExit);
    console.log('HTTP server closed.');

    try {
      await close_database_connection();

      // DEV_NOTE: Other cleanup tasks can be performed here when needed.
      // Examples:
      // - Redis connections
      // - Background jobs
      // - Message queues etc.

      console.log('✅ Shutdown complete, exiting process.');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during shutdown: ', error);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => shutdown_server('SIGTERM'));
process.on('SIGINT', () => shutdown_server('SIGINT'));
process.on('SIGUSR2', () => shutdown_server('SIGUSR2')); // For nodemon restarts
