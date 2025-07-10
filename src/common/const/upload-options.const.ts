import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const uploadOption: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const now = new Date();
      const year = now.getFullYear().toString();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');

      const uploadPath = path.join(process.cwd(), 'uploads', year, month, day);

      // Tạo thư mục nếu chưa tồn tại
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExt = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/jpg',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new HttpException('Chỉ chấp nhận file ảnh (.jpg, .jpeg, .png, .gif, .webp)', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
};