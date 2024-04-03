"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectUserController_1 = require("../controllers/projectUserController");
const projectUserRouter = express_1.default.Router();
projectUserRouter.route("/projectUsers")
    .get(projectUserController_1.getProjectUsers)
    .post(projectUserController_1.assignUserToProject);
exports.default = projectUserRouter;
