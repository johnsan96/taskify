"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectTaskController_1 = require("../controllers/projectTaskController");
const projectTaskRouter = express_1.default.Router();
projectTaskRouter.route("/projectTasks")
    .get(projectTaskController_1.getProjectTasks)
    .post(projectTaskController_1.assignTaskToProject);
exports.default = projectTaskRouter;
