import { connectToDatabase } from '@/utils/db'; 
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

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

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const pdfPath = path.join(process.cwd(), 'public', 'uploads', `${visaNumber}.pdf`);

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(18).text('Visa Details', { align: 'center' });
    doc.moveDown(0.5);

    const table = [
      ['Field', 'Details'],
      ['Visa Number', visaNumber],
      ['Visa Type (Arabic)', visaTypeArabic],
      ['Visa Type (English)', visaTypeEnglish],
      ['Visa Purpose (Arabic)', visaPurposeArabic],
      ['Visa Purpose (English)', visaPurposeEnglish],
      ['Date of Issue', dateOfIssue],
      ['Date of Expiry', dateOfExpiry],
      ['Place of Issue (Arabic)', placeOfIssueArabic],
      ['Full Name (Arabic)', fullNameArabic],
      ['Full Name (English)', fullNameEnglish],
      ['MOI Reference', moiReference],
      ['Nationality', nationality],
      ['Gender', gender],
      ['Occupation (Arabic)', occupationArabic],
      ['Occupation (English)', occupationEnglish],
      ['Date of Birth', dob],
      ['Passport Number', passportNo],
      ['Passport Expiry', passportExpiry],
      ['Date of Entry', entryDate],
      ['Date of Departure', departureDate],
    ];

    const tableWidth = 480;
    const columnWidth = tableWidth / 2;

    doc.fillColor('#d9d9d9');
    doc.rect(50, doc.y, tableWidth, 20).fill();
    doc.fillColor('black');

    doc.fontSize(12).text('Field', 50, doc.y + 5, { width: columnWidth, align: 'left' });
    doc.text('Details', 50 + columnWidth, doc.y + 5, { width: columnWidth, align: 'left' });
    doc.moveDown();

    table.forEach((row, index) => {
      const [field, details] = row;

      doc.fillColor(index % 2 === 0 ? '#ffffff' : '#f2f2f2');
      doc.rect(50, doc.y, tableWidth, 20).fill();
      doc.fillColor('black');

      doc.fontSize(10).text(field, 50, doc.y + 5, { width: columnWidth, align: 'left' });
      doc.text(details, 50 + columnWidth, doc.y + 5, { width: columnWidth, align: 'left' });
      doc.moveDown();
    });

    doc.end();

    return new Response(JSON.stringify({ message: 'Visa details uploaded and PDF generated successfully!', result }), { status: 200 });
  } catch (error) {
    console.error('Database insertion error:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload visa details' }), { status: 500 });
  }
}
