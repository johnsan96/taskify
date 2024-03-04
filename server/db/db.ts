import sqlite3 from 'sqlite3';
import { Sequelize } from 'sequelize';

// Pfad zur SQLite-Datenbankdatei
const dbPath = '/home/john/sqlitesTables/task.db'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath
  });
  
// Öffne die Verbindung zur SQLite-Datenbank
// kann später weg - sequelize reicht
export let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank', err.message);
    } else {
        console.log('Verbindung zur SQLite-Datenbank hergestellt.');
    }
});
