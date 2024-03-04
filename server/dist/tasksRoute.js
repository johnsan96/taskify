"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const taskRouter = express_1.default.Router();
const connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "Acbf6996-",
    database: "MeineDatenbank",
});
// Verbinde dich mit der Datenbank
connection.connect((err) => {
    if (err) {
        console.error("Fehler beim Herstellen der Verbindung zur Datenbank: " + err.stack);
        return;
    }
    console.log("Verbindung zur Datenbank hergestellt");
});
taskRouter.route("/tasks")
    .get((req, res) => {
    //res.send(users); geht auch, wird aber nicht automatisch zu JSON formattiert
    res.send("Hier ist die Task-Route");
});
exports.default = taskRouter;
