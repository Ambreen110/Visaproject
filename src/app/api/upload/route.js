
import { connectToDatabase } from '@/utils/db'; 

export async function POST(req) {
  const data = await req.json();

  const {
    visaNumber,
    visaTypeArabic,
    visaTypeEnglish,
    visaPurposeArabic,
    visaPurposeEnglish,
    dateOfIssue,
    dateOfExpiry,
    placeOfIssueArabic,
    fullNameArabic,
    fullNameEnglish,
    moiReference,
    nationality,
    gender,
    occupationArabic,
    occupationEnglish,
    dob,
    passportNo,
    passportExpiry,
    entryDate,
    departureDate,
  } = data;

  try {
    const { db } = await connectToDatabase();

    const result = await db.collection('visaDetails').insertOne({
      visaNumber,
      visaTypeArabic,
      visaTypeEnglish,
      visaPurposeArabic,
      visaPurposeEnglish,
      dateOfIssue,
      dateOfExpiry,
      placeOfIssueArabic,
      fullNameArabic,
      fullNameEnglish,
      moiReference,
      nationality,
      gender,
      occupationArabic,
      occupationEnglish,
      dob,
      passportNo,
      passportExpiry,
      entryDate,
      departureDate,
    });

    return new Response(JSON.stringify({ message: 'Visa details uploaded successfully!', result }), { status: 200 });
  } catch (error) {
    console.error('Database insertion error:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload visa details' }), { status: 500 });
  }
}