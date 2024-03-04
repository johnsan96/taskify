import express from 'express';
import { getTask, deleteTask, getTasks, putTask, postTask } from '../controllers/taskController';

const taskRouter = express.Router();

taskRouter.route("/tasks")
    .get(getTasks)
    .post(postTask);

//----------------------- Requests Targetting A Specific Task/////////////////////////////////////////////////
taskRouter.route("/tasks/:id")
    .get(getTask)
    .put(putTask)
    .delete(deleteTask)

export default taskRouter;

