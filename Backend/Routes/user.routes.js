import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/user.controller.js";
import { jwtVerify } from "../utils/jwtVerify.js";

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/verify', jwtVerify)

export {userRouter}
