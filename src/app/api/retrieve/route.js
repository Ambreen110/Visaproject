import { connectToDatabase } from '@/utils/db';
import Visa from '@/models/visa'; 
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

    const dobDate = new Date(dob);
    await connectToDatabase();

    const visaDetails = await Visa.findOne({
      passportNo,
      dob: {
        $gte: new Date(dobDate.setUTCHours(0, 0, 0, 0)),
        $lt: new Date(dobDate.setUTCHours(23, 59, 59, 999)),
      },
    }).exec();

    if (!visaDetails) {
      return new Response(JSON.stringify({ message: 'Visa not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pdfFileName = visaDetails.pdfPath || `${visaDetails.visaNumber || 'default'}.pdf`;
    const pdfPath = path.isAbsolute(pdfFileName)
      ? pdfFileName
      : path.join(process.cwd(), 'public', 'Pdfs', pdfFileName);

    if (!fs.existsSync(pdfPath)) {
      return new Response(JSON.stringify({ message: 'PDF file not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileBuffer = fs.readFileSync(pdfPath);

    return new Response(fileBuffer, {
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
