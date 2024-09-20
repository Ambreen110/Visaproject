import { connectToDatabase } from '@/utils/db';
import path from 'path';
import fs from 'fs';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const passportNo = searchParams.get('passportNo');
    const dob = searchParams.get('dob');

    if (!passportNo || !dob) {
      return new Response(JSON.stringify({ message: 'Missing passport number or date of birth' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { db } = await connectToDatabase();

    const visaDetails = await db.collection('visaDetails').findOne({ passportNo, dob });

    if (!visaDetails) {
      return new Response(JSON.stringify({ message: 'Visa not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pdfPath = path.join(process.cwd(), 'public', 'uploads', `${visaDetails.visaNumber}.pdf`);

    if (!fs.existsSync(pdfPath)) {
      return new Response(JSON.stringify({ message: 'PDF file not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileStream = fs.createReadStream(pdfPath);
    return new Response(fileStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${visaDetails.visaNumber}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error retrieving visa details:', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve visa details' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
