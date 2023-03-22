import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadDir = path.resolve(__dirname, '..', 'uploads');
const uploadTempDir = path.resolve(__dirname, '..', 'temp');

export default {
  directory: uploadDir,
  uploadTempDir,
  storage: multer.diskStorage({
    destination: uploadDir,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(6).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      cb(null, filename);
    },
  }),
};
