import File from "./file.model.js";
import cleanObject from "../../utils/clear-object.js";

class FileRepository {
  constructor(db) {
    this.db = db;
  }

  async createFile(file) {
    const preparedFile = cleanObject(file);

    return this.db.transaction(async (trx) => {
      await trx(File.tableName).insert(preparedFile);
      const file = await trx(File.tableName).where(preparedFile).first();
      return new File(file);
    });
  }

  async deleteFileById(fileId) {
    await this.db(File.tableName).where({ id: fileId }).del();
  }

  async getAll({ limit = 10, offset = 0 }) {
    const files = await this.db(File.tableName)
      .select("*")
      .limit(limit)
      .offset(offset);

    return files.map((file) => new File(file));
  }

  async getById(fileId) {
    const file = await this.db(File.tableName).where({ id: fileId }).first();

    return file ? new File(file) : file;
  }

  async updateFile(fileId, newFile) {
    const updatedFile = await this.db(File.tableName)
      .where({ id: fileId })
      .update(newFile);

    return new File(updatedFile);
  }
}

export default FileRepository;
