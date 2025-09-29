import { Router } from "express";
const router = Router();

router.post("/file/upload", (req, res) => {});
router.get("/file/list", (req, res) => {});
router.get("/file/:id", (req, res) => {});
router.delete("/file/delete/:id", (req, res) => {});
router.put("/file/update/:id", (req, res) => {});
router.get("/file/download/:id", (req, res) => {});

export default router;
