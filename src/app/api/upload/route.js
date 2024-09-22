import { connectToDatabase } from '@/utils/db';
import Visa from '@/models/visa';
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
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

  const { db } = await connectToDatabase();

  try {
    // Check for unique visa and passport numbers
    const existingVisa = await Visa.findOne({ visaNumber });
    const existingPassport = await Visa.findOne({ passportNo });

    if (existingVisa) {
      return new Response(JSON.stringify({ message: 'Visa Number must be unique' }), { status: 400 });
    }
    if (existingPassport) {
      return new Response(JSON.stringify({ message: 'Passport Number must be unique' }), { status: 400 });
    }

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Load background image
    const imageBytes = fs.readFileSync(path.join(process.cwd(), 'public', 'images', 'background.png'));
    const backgroundImage = await pdfDoc.embedPng(imageBytes);
    page.drawImage(backgroundImage, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });

    // Add a semi-transparent overlay for fade effect
    page.drawRectangle({
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
      color: rgb(1, 1, 1), // White color for a subtle fade
      opacity: 0.05, // Very low opacity for a slight fade
    });

    // Define text position and styles
    const drawText = (text, x, y) => {
      page.drawText(text, { x, y, size: 12, color: rgb(0, 0, 0) });
    };

    // Add all fields to the PDF
    drawText(`Visa Number: ${visaNumber}`, 50, 350);
    drawText(`Visa Type (Arabic): ${visaTypeArabic}`, 50, 330);
    drawText(`Visa Type (English): ${visaTypeEnglish}`, 50, 310);
    drawText(`Visa Purpose (Arabic): ${visaPurposeArabic}`, 50, 290);
    drawText(`Visa Purpose (English): ${visaPurposeEnglish}`, 50, 270);
    drawText(`Date of Issue: ${new Date(dateOfIssue).toLocaleDateString()}`, 50, 250);
    drawText(`Date of Expiry: ${new Date(dateOfExpiry).toLocaleDateString()}`, 50, 230);
    drawText(`Place of Issue (Arabic): ${placeOfIssueArabic}`, 50, 210);
    drawText(`Full Name (Arabic): ${fullNameArabic}`, 50, 190);
    drawText(`Full Name (English): ${fullNameEnglish}`, 50, 170);
    drawText(`MOI Reference: ${moiReference}`, 50, 150);
    drawText(`Nationality: ${nationality}`, 50, 130);
    drawText(`Gender: ${gender}`, 50, 110);
    drawText(`Occupation (Arabic): ${occupationArabic}`, 50, 90);
    drawText(`Occupation (English): ${occupationEnglish}`, 50, 70);
    drawText(`Date of Birth: ${new Date(dob).toLocaleDateString()}`, 50, 50);
    drawText(`Passport No: ${passportNo}`, 50, 30);
    drawText(`Passport Expiry: ${new Date(passportExpiry).toLocaleDateString()}`, 50, 10);
    drawText(`Entry Date: ${new Date(entryDate).toLocaleDateString()}`, 300, 350);
    drawText(`Departure Date: ${new Date(departureDate).toLocaleDateString()}`, 300, 330);

    // Save PDF to file system
    const pdfDir = path.join(process.cwd(), 'public', 'Pdfs'); // Ensure this directory exists
    const pdfFilePath = path.join(pdfDir, `${visaNumber}.pdf`);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(pdfFilePath, pdfBytes);

    // Save to the database
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
