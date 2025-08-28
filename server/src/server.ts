import 'dotenv/config';

// This file serves as the entry point to start the API server
import app from './app';
import { database_connection } from './database/connection';

const PORT = process.env.PORT || 5000;

const start_server = async () => {
  await database_connection();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start_server();
