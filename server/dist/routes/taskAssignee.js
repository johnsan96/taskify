"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskAssigneeController_1 = require("../controllers/taskAssigneeController");
const taskAssigneeRouter = express_1.default.Router();
taskAssigneeRouter.route("/taskAssignees")
    .get(taskAssigneeController_1.getTaskAssignees)
    .post(taskAssigneeController_1.assignTaskToUser);
exports.default = taskAssigneeRouter;
