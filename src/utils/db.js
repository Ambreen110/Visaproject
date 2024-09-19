import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure to set your MongoDB URI in .env
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so we don't create a new client every time
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client each time
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('yourDatabaseName'); // Change to your database name
  return { db, client };
}
