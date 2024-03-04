"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelize = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sequelize_1 = require("sequelize");
// Pfad zur SQLite-Datenbankdatei
const dbPath = '/home/john/sqlitesTables/task.db';
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: dbPath
});
// Öffne die Verbindung zur SQLite-Datenbank
// kann später weg - sequelize reicht
exports.db = new sqlite3_1.default.Database(dbPath, sqlite3_1.default.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank', err.message);
    }
    else {
        console.log('Verbindung zur SQLite-Datenbank hergestellt.');
    }
});
