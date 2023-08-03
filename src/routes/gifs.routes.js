import { Router } from "express";
import { GifsContr } from "../controllers/gifs.contr.js";

const gifsRouter = Router();

gifsRouter.get('/', GifsContr.Get)
gifsRouter.post('/', GifsContr.Post)
gifsRouter.delete('/:id', GifsContr.Delete)

export default gifsRouter;