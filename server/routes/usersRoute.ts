import express from 'express';
import { getUsers, postUser, getUser, putUser, deleteUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.route("/users")
    .get(getUsers)
    .post(postUser);

//----------------------- Requests Targetting A Specific User/////////////////////////////////////////////////
userRouter.route("/users/:id")
    .get(getUser)
    .put(putUser)
    .delete(deleteUser)

export default userRouter;

