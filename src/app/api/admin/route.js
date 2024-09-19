import nextConnect from 'next-connect';
import clientPromise from '../../../utils/db';

const handler = nextConnect();

handler.post(async (req, res) => {
  const { passportNumber, dob, visaFile } = req.body;

  if (!passportNumber || !dob || !visaFile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('visa_management');
    const collection = db.collection('visas');

    await collection.insertOne({
      passportNumber,
      dob,
      filePath: visaFile,
    });

    res.status(200).json({ message: 'Visa details added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add visa details' });
  }
});

export default handler;
