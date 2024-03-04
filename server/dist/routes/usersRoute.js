"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.route("/users")
    .get(userController_1.getUsers)
    .post(userController_1.postUser);
//----------------------- Requests Targetting A Specific User/////////////////////////////////////////////////
userRouter.route("/users/:id")
    .get(userController_1.getUser)
    .put(userController_1.putUser)
    .delete(userController_1.deleteUser);
exports.default = userRouter;