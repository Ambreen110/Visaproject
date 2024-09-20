import { connectToDatabase } from '@/utils/db';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const passportNo = formData.get('passportNo');
  const dob = formData.get('dob');
  const file = formData.get('file');

  if (!passportNo || !dob || !file) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  const visaNumber = passportNo + dob; 

  const uploadPath = path.join(process.cwd(), 'public', 'downloads', `${visaNumber}.pdf`);

  try {
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(uploadPath, Buffer.from(buffer));

    const { db } = await connectToDatabase();
    const result = await db.collection('userVisaUploads').insertOne({
      passportNo,
      dob,
      visaPath: `/downloads/${visaNumber}.pdf`, 
      uploadedAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Visa uploaded successfully!', result }), { status: 200 });
  } catch (error) {
    console.error('Error uploading visa:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload visa' }), { status: 500 });
  }
}
