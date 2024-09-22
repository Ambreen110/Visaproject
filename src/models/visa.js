import mongoose from 'mongoose';

const visaSchema = new mongoose.Schema({
  visaNumber: { type: String, unique: true, required: true },
  visaTypeArabic: String,
  visaTypeEnglish: String,
  visaPurposeArabic: String,
  visaPurposeEnglish: String,
  dateOfIssue: Date,
  dateOfExpiry: Date,
  placeOfIssueArabic: String,
  fullNameArabic: String,
  fullNameEnglish: String,
  moiReference: String,
  nationality: String,
  gender: String,
  occupationArabic: String,
  occupationEnglish: String,
  dob: Date,
  passportNo: { type: String, unique: true, required: true },
  passportExpiryDate: Date,
  entryDate: Date,
  departureDate: Date,
  pdfPath: String, 
});


const Visa = mongoose.models.Visa || mongoose.model('Visa', visaSchema);

export default Visa;
