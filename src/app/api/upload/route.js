import { connectToDatabase } from '@/utils/db';
import Visa from '@/models/visa';
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const { db } = await connectToDatabase(); 

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
  } = await req.json();

  try {
    const existingVisa = await db.model('Visa').findOne({ visaNumber });
    const existingPassport = await db.model('Visa').findOne({ passportNo });

    if (existingVisa) {
      return new Response(JSON.stringify({ message: 'Visa Number must be unique' }), { status: 400 });
    }
    if (existingPassport) {
      return new Response(JSON.stringify({ message: 'Passport Number must be unique' }), { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const imageBytes = fs.readFileSync(path.join(process.cwd(), 'public', 'images', 'background.png'));
    const backgroundImage = await pdfDoc.embedPng(imageBytes);
    page.drawImage(backgroundImage, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });

    page.drawRectangle({
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
      color: rgb(1, 1, 1),
      opacity: 0.05,
    });

    const drawText = (text, x, y) => {
      page.drawText(text, { x, y, size: 12, color: rgb(0, 0, 0) });
    };

    const fields = [
      { text: `Visa Number: ${visaNumber}`, x: 50, y: 350 },
      { text: `Visa Type (Arabic): ${visaTypeArabic}`, x: 50, y: 330 },
      { text: `Visa Type (English): ${visaTypeEnglish}`, x: 50, y: 310 },
      { text: `Visa Purpose (Arabic): ${visaPurposeArabic}`, x: 50, y: 290 },
      { text: `Visa Purpose (English): ${visaPurposeEnglish}`, x: 50, y: 270 },
      { text: `Date of Issue: ${new Date(dateOfIssue).toLocaleDateString()}`, x: 50, y: 250 },
      { text: `Date of Expiry: ${new Date(dateOfExpiry).toLocaleDateString()}`, x: 50, y: 230 },
      { text: `Place of Issue (Arabic): ${placeOfIssueArabic}`, x: 50, y: 210 },
      { text: `Full Name (Arabic): ${fullNameArabic}`, x: 50, y: 190 },
      { text: `Full Name (English): ${fullNameEnglish}`, x: 50, y: 170 },
      { text: `MOI Reference: ${moiReference}`, x: 50, y: 150 },
      { text: `Nationality: ${nationality}`, x: 50, y: 130 },
      { text: `Gender: ${gender}`, x: 50, y: 110 },
      { text: `Occupation (Arabic): ${occupationArabic}`, x: 50, y: 90 },
      { text: `Occupation (English): ${occupationEnglish}`, x: 50, y: 70 },
      { text: `Date of Birth: ${new Date(dob).toLocaleDateString()}`, x: 50, y: 50 },
      { text: `Passport No: ${passportNo}`, x: 50, y: 30 },
      { text: `Passport Expiry: ${new Date(passportExpiry).toLocaleDateString()}`, x: 50, y: 10 },
      { text: `Entry Date: ${new Date(entryDate).toLocaleDateString()}`, x: 300, y: 350 },
      { text: `Departure Date: ${new Date(departureDate).toLocaleDateString()}`, x: 300, y: 330 },
    ];

    fields.forEach(field => drawText(field.text, field.x, field.y));

    const pdfDir = path.join(process.cwd(), 'public', 'Pdfs');
    const pdfFilePath = path.join(pdfDir, `${visaNumber}.pdf`);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(pdfFilePath, pdfBytes);

    const visa = await Visa.create({
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
      pdfPath: pdfFilePath,
    });

    return new Response(JSON.stringify({ message: 'Visa details uploaded successfully', visa }), { status: 201 });
  } catch (error) {
    console.error('Error uploading visa details:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload visa details' }), { status: 500 });
  }
}


