import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure this is set correctly in your deployment

let client;
let db;

export async function connectToDatabase() {
  // If already connected, return the existing db and client
  if (db) {
    return { db, client };
  }

  // Initialize the client only once
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });

  // Connect to the database
  await client.connect();
  db = client.db(process.env.DB_NAME); 
  return { db, client };
}
