import { Router } from "express";

class FileRoutes {
  /**
   * @param {FileService} fileService
   * @param {FileUploader} fileUploader
   */

  constructor({ fileService, fileUploader }) {
    this.fileService = fileService;
    this.fileUploder = fileUploader;
    this.router = Router();

    this.router.post(
      "/upload",
      this.fileUploder.readFile(),
      this.upload.bind(this),
    );
    this.router.get("/list", this.list.bind(this));
    this.router.get("/:id", (req, res) => {});
    this.router.delete("/delete/:id", this.delete.bind(this));
    this.router.put(
      "/update/:id",
      this.fileUploder.readFile(),
      this.update.bind(this),
    );
    this.router.get("/download/:id", this.download.bind(this));

    return this.router;
  }

  async upload(req, res, next) {
    const { filename, mimetype, size, path } = req.file;
    try {
      await this.fileService.uploadFile({
        userId: req.user.id,
        name: filename,
        extension: "." + mimetype.split("/")[1],
        mimeType: mimetype,
        path,
        size,
      });

      res.status(200).send("OK");
    } catch (e) {
      next(e);
    }
  }

  async list(req, res, next) {
    const { page, list_size } = req.query;

    try {
      const result = await this.fileService.getAll({
        offset: page <= 0 ? 0 : (page - 1) * list_size,
        limit: list_size,
      });

      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { filename, mimetype, size, path } = req.file;

    try {
      await this.fileService.updateFile({
        oldFileId: id,
        userId: req.user.id,
        name: filename,
        extension: "." + mimetype.split("/")[1],
        mimeType: mimetype,
        path,
        size,
      });

      res.status(200).send("OK");
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await this.fileService.deleteFile({ fileId: id });
      res.send("OK").status(200);
    } catch (e) {
      next(e);
    }
  }

  async download(req, res, next) {
    try {
      const file = await this.fileService.getById({ fileId: req.params.id });

      res.download(file.path, file.name);
    } catch (e) {
      next(e);
    }
  }
}

export default FileRoutes;
