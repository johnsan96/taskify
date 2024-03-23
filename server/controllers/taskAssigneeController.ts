import { Request, Response } from 'express';
import { TaskAssignee } from '../models/taskAssignee'; 

export async function getTaskAssignees(req: Request, res: Response) {
    const taskId = req.query.task_id as string; 
    try {
        const taskAssignees = await TaskAssignee.findAll({ where: { task_id: taskId } });
        res.json(taskAssignees);
    } catch (error) {
        console.error('Fehler beim Abrufen der Zuweisungen von Aufgaben zu Benutzern:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Zuweisungen von Aufgaben zu Benutzern' });
    }
}

export async function assignTaskToUser(req: Request, res: Response) {
    const { task_id, user_id } = req.body;
    try {
        const newAssignment = await TaskAssignee.create({ task_id, user_id });
        res.status(201).json(newAssignment);
    } catch (error) {
        console.error('Fehler beim Zuweisen der Aufgabe an den Benutzer:', error);
        res.status(500).json({ error: 'Fehler beim Zuweisen der Aufgabe an den Benutzer' });
    }
}
