import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import machineRoutes from '../routes/machines.js';
import authRoutes from '../routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://tech-gold-six.vercel.app', // adjust for production
  credentials: true
}));

// MongoDB connection (prevent multiple connections in serverless)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

// Routes
app.use('/api/machines', machineRoutes);
app.use('/api/auth', authRoutes);

// Export serverless handler
export const handler = serverless(app);
