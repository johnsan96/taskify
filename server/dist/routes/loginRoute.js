"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controllers/loginController");
const passport_1 = __importDefault(require("passport"));
const loginRouter = express_1.default.Router();
const authenticate = passport_1.default.authenticate('basic', { session: true });
loginRouter.route("/login")
    .post(loginController_1.login);
exports.default = loginRouter;
