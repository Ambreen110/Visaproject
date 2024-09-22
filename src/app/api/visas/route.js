import { connectToDatabase } from '../../../utils/db';
import Visa from '../../../models/visa';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    console.log('Connected to database:', db.databaseName);

    // Use the Visa model to find all visas
    const visas = await Visa.find({}).exec();
    console.log('Fetched visas:', visas); 

    if (visas.length > 0) {
      return new Response(JSON.stringify(visas), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.warn('No visas found in the collection');
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Failed to fetch visas', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve visa details' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
