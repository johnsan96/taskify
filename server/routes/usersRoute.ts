import express from 'express';
import { getUsers, postUser, getUser, putUser, deleteUser } from '../controllers/userController';
import passport from 'passport';

const userRouter = express.Router();

// Middleware für Passport-Authentifizierung
/* const authenticate = passport.authenticate('basic', { session: true }); */

userRouter.route("/users")
    .get(/* authenticate, */getUsers)
    .post(postUser);

//----------------------- Requests Targetting A Specific User/////////////////////////////////////////////////
userRouter.route("/users/:id")
    .get(/* authenticate, */ getUser)
    .put(/* authenticate,  */putUser)
    .delete(/* authenticate, */ deleteUser)

export default userRouter;

