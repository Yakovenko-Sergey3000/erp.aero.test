import File from "./file.model.js";

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
    if (!userId) throw new Error("user id is required");
    if (!name) throw new Error("name is required");
    if (!mimeType) throw new Error("mime_type is required");
    if (!size) throw new Error("size is required");
    if (!path) throw new Error("path is required");

    const file = new File({
      user_id: userId,
      name,
      extension,
      mime_type: mimeType,
      size,
      uploaded_at: new Date(),
      path,
    });

    try {
      await this.fileRepo.createFile(file);
    } catch (e) {
      throw new Error(`Error uploading file: ${e}`);
    }
  }
  async deleteFile({ fileId }) {
    if (!fileId) throw new Error("fileId is required");

    const file = await this.fileRepo.getById({ fileId: fileId });

    if (!file) throw new Error(`File with ${fileId} does not exist`);

    try {
      await this.fileRepo.deleteFileById(file.id);
      await this.fileUploader.deleteFile({ filePath: file.path });
    } catch (e) {
      throw new Error(`Error delete file: ${e}`);
    }
  }

  async getAll({ offset, limit }) {
    return this.fileRepo.getAll({ limit, offset });
  }

  async getById({ fileId }) {
    try {
      const file = await this.fileRepo.getById(fileId);

      if (!file) throw new Error(`File with id ${fileId} does not exist`);

      return file;
    } catch (e) {
      throw new Error(`Error getting file: ${e}`);
    }
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
    try {
      if (!oldFileId) throw new Error("oldFileId is required");

      const replaceFile = await this.getById({ file_id: oldFileId });

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
    } catch (e) {
      throw new Error(`Error updating file: ${e}`);
    }
  }
}

export default FileService;
