import express from 'express';
import { login } from '../controllers/loginController';

const loginRouter = express.Router();

loginRouter.route("/login")
    .post(login);

export default loginRouter;