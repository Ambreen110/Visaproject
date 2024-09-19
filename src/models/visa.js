import mongoose from 'mongoose';

const visaSchema = new mongoose.Schema({
  visaNumber: String,
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
  passportNo: String,
  passportExpiryDate: Date,
  entryDate: Date,
  departureDate: Date,
});

const Visa = mongoose.models.Visa || mongoose.model('Visa', visaSchema);

export default Visa;
