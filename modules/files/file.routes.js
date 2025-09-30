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

  async upload(req, res) {
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

      res.send("OK").status(200);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  }

  async list(req, res) {
    const { page, list_size } = req.query;

    try {
      const result = await this.fileService.getAll({
        offset: page <= 0 ? 0 : (page - 1) * list_size,
        limit: list_size,
      });

      res.send(result).status(200);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async update(req, res) {
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

      res.send("OK").status(200);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await this.fileService.deleteFile({ fileId: id });
      res.send("OK").status(200);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async download(req, res) {
    try {
      const file = await this.fileService.getById({ fileId: req.params.id });

      res.download(file.path, file.name);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
}

export default FileRoutes;
