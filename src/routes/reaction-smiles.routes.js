import { Router } from "express";
import { ReactionSmileContr } from "../controllers/reaction-smiles.contr.js";

const reactionSmilesRouter = Router();

reactionSmilesRouter.get('/', ReactionSmileContr.Get)
reactionSmilesRouter.post('/', ReactionSmileContr.Post)
reactionSmilesRouter.put('/:id', ReactionSmileContr.Put)
reactionSmilesRouter.delete('/:id', ReactionSmileContr.Delete)


export default reactionSmilesRouter;