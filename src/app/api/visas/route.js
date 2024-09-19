import { connectToDatabase } from '../../../utils/db';
import Visa from '../../../models/visa'; // Assuming Visa is the correct Mongoose model

export async function GET() {
  try {
    // Ensure database connection is established
    await connectToDatabase();

    // Fetch all visas from the database using the Mongoose model
    const visas = await Visa.find({});

    // Return the fetched visas
    return new Response(JSON.stringify(visas), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch visas', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve visa details' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
