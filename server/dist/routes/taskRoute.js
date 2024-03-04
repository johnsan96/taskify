"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const taskRouter = express_1.default.Router();
taskRouter.route("/tasks")
    .get(taskController_1.getTasks)
    .post(taskController_1.postTask);
//----------------------- Requests Targetting A Specific Task/////////////////////////////////////////////////
taskRouter.route("/tasks/:id")
    .get(taskController_1.getTask)
    .put(taskController_1.putTask)
    .delete(taskController_1.deleteTask);
exports.default = taskRouter;
