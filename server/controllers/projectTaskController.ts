import { Request, Response } from 'express';
import { ProjectTask } from '../models/projectTask'; 

export async function getProjectTasks(req: Request, res: Response) {
    try {
        const projectTasks = await ProjectTask.findAll();
        res.json(projectTasks);
    } catch (error) {
        console.error('Fehler beim Abrufen der Zuweisungen von Aufgaben zu Projekten:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Zuweisungen von Aufgaben zu Projekten' });
    }
}

export async function assignTaskToProject(req: Request, res: Response) {
    const { project_id, task_id } = req.body;
    try {
        const newAssignment = await ProjectTask.create({ project_id, task_id });
        res.status(201).json(newAssignment);
    } catch (error) {
        console.error('Fehler beim Zuweisen der Aufgabe an das Projekt:', error);
        res.status(500).json({ error: 'Fehler beim Zuweisen der Aufgabe an das Projekt' });
    }
}


