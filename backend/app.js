import express from 'express';
import cors from 'cors';
import basketRoutes from './routes/basketRoutes.js';
import programRoutes from './routes/programRoutes.js';
import programContentRoutes from './routes/programContentRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Program Management Backend is healthy and operational',
    timestamp: new Date().toISOString(),
  });
});

// Mount modular API routes
app.use('/api/baskets', basketRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/program-contents', programContentRoutes);

// Catch 404 for unhandled routes
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;

