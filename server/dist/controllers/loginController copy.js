"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db/db");
function login(req, res) {
    /*  const username = req.body.username;
     const password = req.body.password; */
    /**
     * basic auth
     * client give username & password
     * authrization: "Basic john:123"
     * then in the backend decode the base64
     */
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    console.log("credential from user" + username, password);
    // Führe eine SQL-Abfrage aus, um den Benutzer mit dem angegebenen Benutzernamen abzurufen
    const sql = 'SELECT * FROM users WHERE username = ?';
    db_1.db.get(sql, [username], (err, row) => {
        if (err) {
            console.error('Fehler beim Abrufen des Benutzers aus der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Abrufen des Benutzers aus der Datenbank' });
            return;
        }
        if (row) {
            // Benutzer wurde gefunden, überprüfe das Passwort
            bcrypt_1.default.compare(password, row.password, (error, result) => {
                if (result) {
                    // Passwort ist korrekt, sende den Benutzer als Antwort
                    const userSessionData = {
                        id: row.id,
                        username: row.username,
                    };
                    req.session.user = userSessionData;
                    res.status(200).json({ message: 'Erfolgreich angemeldet', user: req.session.user });
                }
                else {
                    // Falsche Kombination aus Benutzername und Passwort
                    res.status(401).send({ message: "Falsche Benutzername/Passwort-Kombination" });
                }
            });
        }
        else {
            // Benutzer existiert nicht
            res.send({ message: "Benutzer existiert nicht" });
        }
    });
}
exports.login = login;
