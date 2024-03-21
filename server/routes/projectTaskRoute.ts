import express from 'express';
import { getProjectTasks, assignTaskToProject } from '../controllers/projectTaskController';

const projectTaskRouter = express.Router();

projectTaskRouter.route("/projectTasks")
    .get(getProjectTasks)
    .post(assignTaskToProject);


export default projectTaskRouter;