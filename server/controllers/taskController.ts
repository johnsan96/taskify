import { Request, Response } from 'express';
import { Task } from '../models/task';
import { ProjectTask } from '../models/projectTask';
import { TaskAssignee } from '../models/taskAssignee';

// Funktion zum Abrufen aller Aufgaben
export async function getTasks(req: Request, res: Response) {
    try {
        const task = await Task.findAll();
        res.json(task);
    } catch (error) {
        console.error('Fehler beim Abrufen der Aufgaben:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Aufgaben' });
    }
}

// Funktion zum Erstellen einer neuen Aufgabe
export async function postTask(req: Request, res: Response) {
    const { name, description } = req.body;
    try {
        const newTask = await Task.create({ name, description });
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Fehler beim Erstellen der Aufgabe:', error);
        res.status(500).json({ error: 'Fehler beim Erstellen der Aufgabe' });
    }
}

// Funktion zum Abrufen einer bestimmten Aufgabe anhand der ID
export async function getTask(req: Request, res: Response) {
    const taskId = req.params.id;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).json({ message: 'Aufgabe nicht gefunden' });
            return;
        }
        res.json(task);
    } catch (error) {
        console.error('Fehler beim Abrufen der Aufgabe:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Aufgabe' });
    }
}

// Funktion zum Aktualisieren einer Aufgabe anhand der ID
export async function putTask(req: Request, res: Response) {
    const taskId = req.params.id;
    const { name, description, status_id } = req.body;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).json({ message: 'Aufgabe nicht gefunden' });
            return;
        }
        await task.update({ name, description,status_id });
        res.json({ message: 'Aufgabe erfolgreich aktualisiert' });
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Aufgabe:', error);
        res.status(500).json({ error: 'Fehler beim Aktualisieren der Aufgabe' });
    }
}

// Funktion zum Löschen einer Aufgabe anhand der ID
export async function deleteTask(req: Request, res: Response) {
    const taskId = req.params.id;
    try {
        const task = await Task.findByPk(taskId);
        await ProjectTask.destroy({ where: { task_id: taskId } });
        await TaskAssignee.destroy({ where: { task_id: taskId } });
        if (!task) {
            res.status(404).json({ message: 'Aufgabe nicht gefunden' });
            return;
        }
        await task.destroy();
        res.json({ message: 'Aufgabe erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen der Aufgabe:', error);
        res.status(500).json({ error: 'Fehler beim Löschen der Aufgabe' });
    }
}
