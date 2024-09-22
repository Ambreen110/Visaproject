import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
let isConnected;

export async function connectToDatabase() {
  if (isConnected) {
    return { db: mongoose.connection }; 
  }
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, 
    });
    isConnected = true;
    console.log('Connected to MongoDB');
    return { db: mongoose.connection }; 
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; 
  }
}
