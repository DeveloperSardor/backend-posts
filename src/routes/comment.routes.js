import { Router } from "express";
import { checkToken } from "../middlewares/check.token.js";
import { CommentsContr } from "../controllers/comment.contr.js";

const commentRouter = Router();

commentRouter.get('/:post_id', CommentsContr.GetComments);
commentRouter.post('/', checkToken, CommentsContr.AddComment);
commentRouter.put('/:id', checkToken, CommentsContr.PutComment);
commentRouter.delete('/:id', checkToken, CommentsContr.deleteComment);



export default commentRouter;