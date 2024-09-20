import { connectToDatabase } from '../../../utils/db';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    console.log('Connected to database:', db.databaseName);

    const userUploadedVisas = await db.collection('userVisaUploads').find({}).toArray();
    console.log('Fetched user-uploaded visas:', userUploadedVisas); 

    if (userUploadedVisas.length > 0) {
      return new Response(JSON.stringify(userUploadedVisas), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.warn('No user-uploaded visas found in the collection');
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Failed to fetch user-uploaded visas', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve user-uploaded visa details' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
