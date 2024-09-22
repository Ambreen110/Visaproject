import { connectToDatabase } from '@/utils/db';
import Visa from '@/models/visa'; // Use the Visa model
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

    // Use the Visa model to find the visa details
    let visaDetails = await Visa.findOne({ passportNo, dob }).exec();

    if (!visaDetails) {
      return new Response(JSON.stringify({ message: 'Visa not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get the PDF path from the visa details
    const pdfFileName = visaDetails.pdfPath || `${visaDetails.visaNumber}.pdf`; // Adjust if necessary
    const pdfPath = path.join(process.cwd(), 'public', 'Pdfs', pdfFileName);

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
        'Content-Disposition': `attachment; filename="${pdfFileName}"`,
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
