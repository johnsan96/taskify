import express from 'express';
import { getTaskAssignees, assignTaskToUser } from '../controllers/taskAssigneeController';

const taskAssigneeRouter = express.Router();

taskAssigneeRouter.route("/taskAssignees")
    .get(getTaskAssignees)
    .post(assignTaskToUser);


export default taskAssigneeRouter;

