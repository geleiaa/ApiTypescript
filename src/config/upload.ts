import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadDir = path.resolve(__dirname, '..', 'uploads');

export default {
  directory: uploadDir,
  storage: multer.diskStorage({
    destination: uploadDir,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(6).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      cb(null, filename);
    },
  }),
};
