import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure this is set correctly in your deployment

let client;
let db;

export async function connectToDatabase() {
  if (db) {
    return { db, client };
  }
  
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  await client.connect();
  db = client.db(process.env.DB_NAME); 
  return { db, client };
}
