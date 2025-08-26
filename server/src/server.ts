// This file serves as the entry point to start the API server
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connect_to_database } from './database/connection';

const PORT = process.env.PORT || 5000;

const start_server = async () => {
  await connect_to_database();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start_server();
