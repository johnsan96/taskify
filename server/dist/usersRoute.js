"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
let router = express_1.default.Router();
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
router.route("/users")
    .get((req, res) => {
    //res.send(users); geht auch, wird aber nicht automatisch zu JSON formattiert
    connection.query("SELECT * FROM Kunden", (error, results, fields) => {
        if (error) {
            console.error("Fehler bei der Abfrage: " + error.stack);
            return;
        }
        res.json(results);
    });
})
    .post((req, res) => {
    const newKunde = req.body; // Der neue Kunde wird aus dem Request-Body gelesen
    console.log(newKunde);
    // Füge den neuen Kunden in die Datenbank-Tabelle "Kunden" ein
    const sql = 'INSERT INTO Kunden (vorname, nachname, email, telefon) VALUES (?, ?, ?, ?)';
    const values = [newKunde.vorname, newKunde.nachname, newKunde.email, newKunde.telefon];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Fehler beim Einfügen des Kunden in die Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Einfügen des Kunden in die Datenbank' });
            return;
        }
        console.log('Neuer Kunde wurde erfolgreich in die Datenbank eingefügt.');
        res.status(201).json({ message: 'Neuer Kunde wurde erstellt', kunde: newKunde });
    });
});
//----------------------- Requests Targetting A Specific Article/////////////////////////////////////////////////
router.route("/users/:id")
    .get((req, res) => {
    const customerId = req.params.id; // Die Kunden-ID aus den URL-Parametern
    // Führe eine SQL-Abfrage aus, um den Kunden mit der gegebenen ID abzurufen
    const sql = 'SELECT * FROM Kunden WHERE id = ?';
    connection.query(sql, [customerId], (err, result) => {
        if (err) {
            console.error('Fehler beim Abrufen des Kunden aus der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Abrufen des Kunden aus der Datenbank' });
            return;
        }
        if (result.length === 0) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        }
        else {
            // Wenn der Kunde gefunden wurde
            const kunde = result[0];
            res.status(200).json(kunde);
        }
    });
})
    .put((req, res) => {
    const customerId = req.params.id; // Die Kunden-ID aus den URL-Parametern
    const updatedKunde = req.body; // Die aktualisierten Kundendaten aus dem Request-Body
    // Führe eine SQL-Abfrage aus, um den Kunden mit der gegebenen ID zu aktualisieren
    const sql = 'UPDATE Kunden SET vorname = ?, nachname = ?, email = ?, telefon = ? WHERE id = ?';
    const values = [updatedKunde.vorname, updatedKunde.nachname, updatedKunde.email, updatedKunde.telefon, customerId];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Fehler beim Aktualisieren des Kunden in der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Aktualisieren des Kunden in der Datenbank' });
            return;
        }
        if (result.affectedRows === 0) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        }
        else {
            // Wenn der Kunde erfolgreich aktualisiert wurde
            res.status(200).json({ message: 'Kunde erfolgreich aktualisiert' });
        }
    });
})
    .patch((req, res) => {
    const customerId = req.params.id; // Die Kunden-ID aus den URL-Parametern
    const updatedKunde = req.body; // Die aktualisierten Kundendaten aus dem Request-Body
    // Führe eine SQL-Abfrage aus, um den Kunden mit der gegebenen ID zu aktualisieren
    const sql = 'UPDATE Kunden SET ? WHERE id = ?';
    connection.query(sql, [updatedKunde, customerId], (err, result) => {
        if (err) {
            console.error('Fehler beim Aktualisieren des Kunden in der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Aktualisieren des Kunden in der Datenbank' });
            return;
        }
        if (result.affectedRows === 0) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        }
        else {
            // Wenn der Kunde erfolgreich aktualisiert wurde
            res.status(200).json({ message: 'Kunde erfolgreich aktualisiert' });
        }
    });
})
    .delete((req, res) => {
    const customerId = req.params.id; // Die Kunden-ID aus den URL-Parametern
    // Führe eine SQL-Abfrage aus, um den Kunden mit der gegebenen ID zu löschen
    const sql = 'DELETE FROM Kunden WHERE id = ?';
    connection.query(sql, [customerId], (err, result) => {
        if (err) {
            console.error('Fehler beim Löschen des Kunden aus der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Löschen des Kunden aus der Datenbank' });
            return;
        }
        if (result.affectedRows === 0) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        }
        else {
            // Wenn der Kunde erfolgreich gelöscht wurde
            res.status(200).json({ message: 'Kunde erfolgreich gelöscht' });
        }
    });
});
exports.default = router;
