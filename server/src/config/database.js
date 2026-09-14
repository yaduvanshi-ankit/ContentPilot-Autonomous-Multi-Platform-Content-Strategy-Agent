import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  if (!env.mongoUri) return false;
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 3500 });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.warn(`MongoDB unavailable; starting demo data mode. (${error.message})`);
    return false;
  }
}
