// This file serves as the main Express application set up

import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Security in HTTP headers
import morgan from 'morgan'; // HTTP logger

import apiRoutes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

// Allow frontend requests to backend
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false, // DevNote: change later when authentication/cookies are enabled
  }),
);

export default app;
