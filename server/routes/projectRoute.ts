import express from 'express';
import { getAllProjects, deleteProject, getProjectById, updateProject, createProject } from '../controllers/projectController';

const projectRouter = express.Router();

projectRouter.route("/projects")
    .get(getAllProjects)
    .post(createProject);

//----------------------- Requests Targetting A Specific Project/////////////////////////////////////////////////
projectRouter.route("/project/:id")
    .get(getProjectById)
    .put(updateProject)
    .delete(deleteProject)

export default projectRouter;

