import mongoose from 'mongoose';
import Visa from '@/models/visa';
import fs from 'fs';
import path from 'path';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const passportNo = searchParams.get('passportNo');
  const dob = searchParams.get('dob');

  console.log(`Searching for: { passportNo: '${passportNo}', dob: '${dob}' }`);

  try {
    await connectDB();

    const dobDate = new Date(dob);

    const visaDetails = await Visa.findOne({
      passportNo,
      dob: {
        $gte: new Date(dobDate.getFullYear(), dobDate.getMonth(), dobDate.getDate()),
        $lt: new Date(dobDate.getFullYear(), dobDate.getMonth(), dobDate.getDate() + 1),
      },
    }).exec();

    if (!visaDetails) {
      console.log('No visa found');
      return new Response(JSON.stringify({ error: 'Visa not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Visa details found:', visaDetails);

    const pdfPath = visaDetails.pdfPath;
    if (!pdfPath) {
      return new Response(JSON.stringify({ error: 'PDF not found for this visa' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const absolutePdfPath = path.resolve(pdfPath);

    if (!fs.existsSync(absolutePdfPath)) {
      return new Response(JSON.stringify({ error: 'PDF file not found on the server' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileStream = fs.createReadStream(absolutePdfPath);

    return new Response(fileStream, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${path.basename(pdfPath)}"`,
      },
    });
  } catch (error) {
    console.error('Error retrieving visa details or serving PDF:', error);

    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
