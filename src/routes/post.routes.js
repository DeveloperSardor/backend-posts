import { Router } from "express";
import { PostsContr } from "../controllers/post.contr.js";
import { checkAdmin } from "../middlewares/check-admin.js";

const postRouter = Router();

postRouter.get('/', PostsContr.GetPosts)
postRouter.get('/:id', PostsContr.GetPosts)
postRouter.post('/', checkAdmin, PostsContr.Post)
postRouter.put('/:id', checkAdmin, PostsContr.Put)
postRouter.delete('/:id', checkAdmin, PostsContr.Delete)


export default postRouter;