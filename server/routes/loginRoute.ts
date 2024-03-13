import express from 'express';
import { login } from '../controllers/loginController';
import passport from 'passport';

const loginRouter = express.Router();
const authenticate = passport.authenticate('basic', { session: true });

loginRouter.route("/login")
    .post(login);

export default loginRouter;