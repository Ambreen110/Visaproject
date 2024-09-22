import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongooseClientPromise) {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongooseClientPromise = mongoose.connection;
  }
} else {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

export async function connectToDatabase() {
  await mongoose.connection; 
  return { db: mongoose.connection.db };
}
