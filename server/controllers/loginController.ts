import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db/db';
import { Session, SessionData } from 'express-session';

// Erweiterung des express.Request-Typs
declare module 'express' {
    interface Request {
        session: Session & Partial<SessionData> & { user?: UserSessionData }; // Hinzufügen von `user` zur Sitzung
    }
}

// Schnittstelle für den Typ der Benutzerdaten in der Session
interface UserSessionData {
    id: number;
    username: string;
}

interface row {
    id: number;
    username: string;
    password: string;
}

export function login(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;

    // Führe eine SQL-Abfrage aus, um den Benutzer mit dem angegebenen Benutzernamen abzurufen
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, row: row) => {
        if (err) {
            console.error('Fehler beim Abrufen des Benutzers aus der Datenbank:', err.message);
            res.status(500).json({ error: 'Fehler beim Abrufen des Benutzers aus der Datenbank' });
            return;
        }

        if (row) {
            // Benutzer wurde gefunden, überprüfe das Passwort
            bcrypt.compare(password, row.password, (error, result) => {
                if (result) {
                    // Passwort ist korrekt, sende den Benutzer als Antwort
                    const userSessionData: UserSessionData = {
                        id: row.id,
                        username: row.username,
                    };

                    req.session.user = userSessionData;

                    res.status(200).json({ message: 'Erfolgreich angemeldet', user: req.session.user });
                    console.log(req.session.user);
                } else {
                    // Falsche Kombination aus Benutzername und Passwort
                    res.send({ message: "Falsche Benutzername/Passwort-Kombination" });
                }
            });
        } else {
            // Benutzer existiert nicht
            res.send({ message: "Benutzer existiert nicht" });
        }
    });
}
