import multer from "multer";
import * as fs from "node:fs";

class FileUploader {
  constructor({ path = "uploads/" } = {}) {
    this.uploader = multer({
      storage: multer.diskStorage({
        destination: path,
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    });
    this.readFile = this.readFile.bind(this);
  }

  readFile() {
    return this.uploader.single("file");
  }

  async deleteFile({ filePath } = {}) {
    try {
      await fs.unlink(filePath, (err) => {
        console.log(err);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default FileUploader;
