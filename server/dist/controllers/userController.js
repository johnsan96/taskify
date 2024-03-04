"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.getUser = exports.postUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db/db");
function getUsers(req, res) {
    db_1.db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            console.error('Fehler bei der Abfrage:', err.message);
            res.status(500).send('Fehler bei der Datenbankabfrage');
        }
        else {
            console.log('Ergebnis der Abfrage:');
            console.log(rows);
            res.send(rows);
        }
    });
}
exports.getUsers = getUsers;
function postUser(req, res) {
    const newUser = req.body;
    /*  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
     res.header('Access-Control-Allow-Credentials', true); */
    // Das Passwort hashen
    const saltRounds = 10; // Anzahl der Hash-Runden
    bcrypt_1.default.hash(newUser.password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Fehler beim Hashen des Passworts:', err.message);
            res.status(500).json({ error: 'Fehler beim Erstellen des Benutzers' });
            return;
        }
        // Das gehashte Passwort in die Datenbank einfügen
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const values = [newUser.username, hash];
        db_1.db.run(sql, values, function (err) {
            if (err) {
                console.error('Fehler beim Einfügen des Benutzers in die Datenbank:', err.message);
                res.status(500).json({ error: 'Fehler beim Einfügen des Benutzers in die Datenbank' });
                return;
            }
            console.log('Neuer Benutzer wurde erfolgreich in die Datenbank eingefügt.');
            res.status(201).json({ message: 'Neuer Benutzer wurde erstellt', user: newUser });
        });
    });
}
exports.postUser = postUser;
function getUser(req, res) {
    const customerId = req.params.id; // Die users-ID aus den URL-Parametern
    // Führe eine SQL-Abfrage aus, um den users mit der gegebenen ID abzurufen
    const sql = 'SELECT * FROM users WHERE id = ?';
    db_1.db.get(sql, [customerId], (err, row) => {
        if (err) {
            console.error('Fehler beim Abrufen des users aus der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Abrufen des users aus der Datenbank' });
            return;
        }
        if (!row) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        }
        else {
            // Wenn der Kunde gefunden wurde
            res.status(200).json(row);
        }
    });
}
exports.getUser = getUser;
function putUser(req, res) {
    const customerId = req.params.id; // Die users-ID aus den URL-Parametern
    const updatedKunde = req.body; // Die aktualisierten usersdaten aus dem Request-Body
    // Führe eine SQL-Abfrage aus, um den users mit der gegebenen ID zu aktualisieren
    const sql = 'UPDATE users SET username = ? WHERE id = ?';
    const values = [updatedKunde.username, customerId];
    db_1.db.run(sql, values, function (err) {
        if (err) {
            console.error('Fehler beim Aktualisieren des users in der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Aktualisieren des users in der Datenbank' });
            return;
        }
        if (this.changes === 0) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        }
        else {
            // Wenn der Kunde erfolgreich aktualisiert wurde
            res.status(200).json({ message: 'Kunde erfolgreich aktualisiert' });
        }
    });
}
exports.putUser = putUser;
function deleteUser(req, res) {
    const customerId = req.params.id; // Die users-ID aus den URL-Parametern
    // Führe eine SQL-Abfrage aus, um den users mit der gegebenen ID zu löschen
    const sql = 'DELETE FROM users WHERE id = ?';
    db_1.db.run(sql, [customerId], function (err) {
        if (err) {
            console.error('Fehler beim Löschen des users aus der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Löschen des users aus der Datenbank' });
            return;
        }
        if (this.changes === 0) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        }
        else {
            // Wenn der Kunde erfolgreich gelöscht wurde
            res.status(200).json({ message: 'Kunde erfolgreich gelöscht' });
        }
    });
}
exports.deleteUser = deleteUser;
