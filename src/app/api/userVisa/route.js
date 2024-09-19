import multer from 'multer';
import { connectToDatabase } from '@/utils/db';
import Visa from '@/models/visa';

// Configure multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: '../../../../public/uploads', 
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

const uploadMiddleware = upload.single('visaFile');

export async function POST(req, res) {
  // Promisify the middleware to use in async function
  const runMiddleware = (req, res, fn) =>
    new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });

  try {
    // Connect to MongoDB
    console.log('Connecting to the database...');
    await connectToDatabase();
    console.log('Database connected.');

    // Handle file upload
    console.log('Handling file upload...');
    await runMiddleware(req, res, uploadMiddleware);

    // Check if file was uploaded
    if (!req.file) {
      throw new Error('File upload failed');
    }

    // Save file details to MongoDB
    const uploadedFile = new Visa({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });

    await uploadedFile.save(); // Save to MongoDB

    res.status(200).json({
      message: 'Visa soft copy uploaded and saved to database successfully!',
      file: req.file,
    });
  } catch (error) {
    console.error('Error during upload process:', error.message);
    res.status(500).json({
      error: `Failed to upload visa soft copy and save to database: ${error.message}`,
    });
  }
}

// Disable bodyParser to allow multer to handle the form data
export const config = {
  api: {
    bodyParser: false,
  },
};
