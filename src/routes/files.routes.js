import { Router } from "express";
import { checkAdmin } from "../middlewares/check-admin.js";
import { FilesContr } from "../controllers/files.contr.js";

const filesRouter = Router();

filesRouter.post('/', checkAdmin, FilesContr.PostFile)
filesRouter.delete('/:id', checkAdmin, FilesContr.DeleteFile)

export default filesRouter;