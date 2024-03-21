import express from 'express';
import { getProjectUsers, assignUserToProject } from '../controllers/projectUserController';

const projectUserRouter = express.Router();

projectUserRouter.route("/projectUsers")
    .get(getProjectUsers)
    .post(assignUserToProject);


export default projectUserRouter;