"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const projectRouter = express_1.default.Router();
projectRouter.route("/projects")
    .get(projectController_1.getAllProjects)
    .post(projectController_1.createProject);
//----------------------- Requests Targetting A Specific Project/////////////////////////////////////////////////
projectRouter.route("/project/:id")
    .get(projectController_1.getProjectById)
    .put(projectController_1.updateProject)
    .delete(projectController_1.deleteProject);
exports.default = projectRouter;
