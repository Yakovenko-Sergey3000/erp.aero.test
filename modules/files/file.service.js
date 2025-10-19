import File from "./file.model.js";
import ApiError from "../../errors/api-error.ts";

class FileService {
  /**
   * @param {FileRepository} fileRepository
   * @param {FileUploader} fileUploader
   */
  constructor({ fileRepository, fileUploader }) {
    this.fileRepo = fileRepository;
    this.fileUploader = fileUploader;
  }

  async uploadFile({ userId, name, extension, mimeType, size, path } = {}) {
    if (!userId) throw ApiError.RequiredField("userId");
    if (!name) throw ApiError.RequiredField("name");
    if (!mimeType) throw ApiError.RequiredField("mimeType");
    if (!size) throw ApiError.RequiredField("size");
    if (!path) throw ApiError.RequiredField("path");

    const file = new File({
      user_id: userId,
      name,
      extension,
      mime_type: mimeType,
      size,
      uploaded_at: new Date(),
      path,
    });

    await this.fileRepo.createFile(file);
  }
  async deleteFile({ fileId }) {
    if (!fileId) ApiError.RequiredField("fileId");

    const file = await this.getById({ fileId: fileId });

    await this.fileRepo.deleteFileById(file.id);
    await this.fileUploader.deleteFile({ filePath: file.path });
  }

  async getAll({ offset, limit }) {
    return this.fileRepo.getAll({ limit, offset });
  }

  async getById({ fileId }) {
    if (!fileId) throw ApiError.RequiredField("fileId");

    const file = await this.fileRepo.getById(fileId);

    if (!file) throw ApiError.NotFound();

    return file;
  }

  async updateFile({
    oldFileId,
    userId,
    name,
    extension,
    mimeType,
    size,
    path,
  }) {
    if (!oldFileId) throw ApiError.RequiredField("oldFileId");

    const replaceFile = await this.getById({ fileId: oldFileId });

    const newFile = new File({
      id: replaceFile.id,
      name,
      extension,
      user_id: userId,
      mime_type: mimeType,
      size,
      path,
      uploaded_at: new Date(),
    });

    await this.fileRepo.updateFile(replaceFile.id, newFile);
    await this.fileUploader.deleteFile({ filePath: replaceFile.path });
  }
}

export default FileService;
