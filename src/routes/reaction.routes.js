import { Router } from "express";
import { ReactionToPost } from "../controllers/reaction.contr.js";
import { checkAdmin } from "../middlewares/check-admin.js";
import { checkToken } from "../middlewares/check.token.js";

const reactionRouter = Router();

reactionRouter.get('/:post_id', ReactionToPost.GetReactionToPost)
reactionRouter.post('/', checkToken, ReactionToPost.addReactionToPost)
reactionRouter.put('/:id', checkToken,  ReactionToPost.editReactionToPost)
reactionRouter.delete('/:id', checkToken,  ReactionToPost.deleteReactionToPost)

export default reactionRouter;