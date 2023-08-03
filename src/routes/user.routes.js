import { Router } from "express";
import { UsersContr } from "../controllers/user.contr.js";
import { checkToken } from "../middlewares/check.token.js";

const userRouter = Router();

userRouter.post('/register', UsersContr.Register);
userRouter.post('/login', UsersContr.Login);
userRouter.get('/users/', UsersContr.Get)
userRouter.get('/users/:id', UsersContr.Get)
userRouter.get('/my-profile', checkToken, UsersContr.GetMyProfile);
userRouter.put('/my-profile', checkToken,  UsersContr.EditMyProfile);
userRouter.put('/like/:id', checkToken,  UsersContr.LikePost);
userRouter.put('/delete-like/:id', checkToken,  UsersContr.DeleteLikePost);


export default userRouter;