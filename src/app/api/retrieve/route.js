import { connectToDatabase } from '../../../utils/db';
import Visa from '../../../models/visa'; 
import path from 'path';
import fs from 'fs';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const passportNo = searchParams.get('passportNo');
    const dob = searchParams.get('dob');

    // Check for required parameters
    if (!passportNo || !dob) {
      return new Response(JSON.stringify({ message: 'Missing passport number or date of birth' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();

    const dobDate = new Date(dob);
    const visaDetails = await Visa.findOne({
      passportNo,
      dob: {
        $gte: new Date(dobDate.setUTCHours(0, 0, 0, 0)),
        $lt: new Date(dobDate.setUTCHours(23, 59, 59, 999)),
      },
    }).exec();

    // Check if the visa details were found
    if (!visaDetails) {
      console.warn('Visa not found for the given passport number and date of birth');
      return new Response(JSON.stringify({ message: 'Visa not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Construct the PDF file path
    const pdfFileName = visaDetails.pdfPath ? path.basename(visaDetails.pdfPath) : `${visaDetails.visaNumber || 'default'}.pdf`;
    const pdfPath = path.join(process.cwd(), 'public', 'Pdfs', pdfFileName);

    console.log('PDF Path:', pdfPath); // Debugging line

    // Check if the PDF file exists
    if (!fs.existsSync(pdfPath)) {
      console.error('File does not exist at path:', pdfPath); // Debugging line
      return new Response(JSON.stringify({ message: 'PDF file not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Read the PDF file and return it in the response
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
