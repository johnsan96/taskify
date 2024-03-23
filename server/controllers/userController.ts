import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db/db'

export function getUsers(req: Request, res: Response) {
    const { role } = req.query; 

    let query = "SELECT * FROM users";

    if (role) {
        query += ` WHERE role='${role}'`;
    }

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Fehler bei der Abfrage:', err.message);
            res.status(500).send('Fehler bei der Datenbankabfrage');
        } else {
            console.log('Ergebnis der Abfrage:');
            console.log(rows);
            res.send(rows); 
        }
    });
}

export function postUser(req: Request, res: Response) {
    const newUser = req.body;

   /*  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true); */

    // Das Passwort hashen
    const saltRounds = 10; // Anzahl der Hash-Runden
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Fehler beim Hashen des Passworts:', err.message);
            res.status(500).json({ error: 'Fehler beim Erstellen des Benutzers' });
            return;
        }

        // Das gehashte Passwort in die Datenbank einfügen
        const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        const values = [newUser.username, hash, newUser.role];

        db.run(sql, values, function (err) {
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

export function getUser(req: Request, res: Response) {
    const customerId = req.params.id; // Die users-ID aus den URL-Parametern

    // Führe eine SQL-Abfrage aus, um den users mit der gegebenen ID abzurufen
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [customerId], (err, row) => {
        if (err) {
            console.error('Fehler beim Abrufen des users aus der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Abrufen des users aus der Datenbank' });
            return;
        }

        if (!row) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        } else {
            // Wenn der Kunde gefunden wurde
            res.status(200).json(row);
        }
    });
}

export function putUser(req: Request, res: Response) {
    const customerId = req.params.id; // Die users-ID aus den URL-Parametern
    const updatedKunde = req.body; // Die aktualisierten usersdaten aus dem Request-Body

    // Führe eine SQL-Abfrage aus, um den users mit der gegebenen ID zu aktualisieren
    const sql = 'UPDATE users SET username = ? WHERE id = ?';
    const values = [updatedKunde.username,customerId];

    db.run(sql, values, function (err) {
        if (err) {
            console.error('Fehler beim Aktualisieren des users in der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Aktualisieren des users in der Datenbank' });
            return;
        }

        if (this.changes === 0) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        } else {
            // Wenn der Kunde erfolgreich aktualisiert wurde
            res.status(200).json({ message: 'Kunde erfolgreich aktualisiert' });
        }
    });
}

export function deleteUser(req: Request, res: Response) {
    const customerId = req.params.id; // Die users-ID aus den URL-Parametern

    // Führe eine SQL-Abfrage aus, um den users mit der gegebenen ID zu löschen
    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, [customerId], function (err) {
        if (err) {
            console.error('Fehler beim Löschen des users aus der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Löschen des users aus der Datenbank' });
            return;
        }

        if (this.changes === 0) {
            // Wenn kein Kunde mit der gegebenen ID gefunden wurde
            res.status(404).json({ message: 'Kunde nicht gefunden' });
        } else {
            // Wenn der Kunde erfolgreich gelöscht wurde
            res.status(200).json({ message: 'Kunde erfolgreich gelöscht' });
        }
    });
}

