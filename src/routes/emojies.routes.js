import { Router } from "express";
import { EmojiesContr } from "../controllers/emojies.contr.js";

const emojiesRouter = Router();

emojiesRouter.get('/', EmojiesContr.GetEmoji)
emojiesRouter.post('/', EmojiesContr.AddEmoji)
emojiesRouter.delete('/:id', EmojiesContr.deleteEmoji)


export default emojiesRouter;