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

    // Insert data into the database
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

    // Create a PDF document
    const doc = new PDFDocument();
    const pdfPath = path.join(process.cwd(), 'public', 'uploads', `${visaNumber}.pdf`);

    // Pipe the PDF into a file
    doc.pipe(fs.createWriteStream(pdfPath));

    // Add title
    doc.fontSize(25).text('Visa Details', { align: 'center' });
    doc.moveDown();

    // Create table structure
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

    const tableWidth = 500;
    const columnWidth = tableWidth / 2;

    // Draw table headers
    doc.fontSize(12).fillColor('black');
    table.forEach((row, index) => {
      const [field, details] = row;

      // Draw header background
      if (index === 0) {
        doc.fillColor('#d9d9d9');
        doc.rect(50, doc.y, tableWidth, 20).fill();
        doc.fillColor('black');
      }

      // Draw table cells
      doc.text(field, 50, doc.y, { width: columnWidth, align: 'left' });
      doc.text(details, 50 + columnWidth, doc.y, { width: columnWidth, align: 'left' });

      doc.moveDown(1);
    });

    // Finalize the PDF and end the stream
    doc.end();

    return new Response(JSON.stringify({ message: 'Visa details uploaded and PDF generated successfully!', result }), { status: 200 });
  } catch (error) {
    console.error('Database insertion error:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload visa details' }), { status: 500 });
  }
}
