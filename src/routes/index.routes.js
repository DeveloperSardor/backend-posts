import { Router } from "express";
import commentRouter from "./comment.routes.js";
import emojiesRouter from "./emojies.routes.js";
import filesRouter from "./files.routes.js";
import gifsRouter from "./gifs.routes.js";
import postRouter from "./post.routes.js";
import reactionSmilesRouter from "./reaction-smiles.routes.js";
import reactionRouter from "./reaction.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use('/comments', commentRouter)
router.use('/emojies', emojiesRouter)
router.use('/files', filesRouter)
router.use('/gifs', gifsRouter)
router.use('/posts', postRouter)
router.use('/reaction-smiles', reactionSmilesRouter)
router.use('/reaction', reactionRouter)
router.use('/users', userRouter)


export default router;