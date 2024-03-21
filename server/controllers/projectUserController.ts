import { Request, Response } from 'express';
import { ProjectUser } from '../models/projectUsers'; 

export async function getProjectUsers(req: Request, res: Response) {
    try {
        const projectUsers = await ProjectUser.findAll();
        res.json(projectUsers);
    } catch (error) {
        console.error('Fehler beim Abrufen der Zuweisungen von Benutzern zu Projekten:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Zuweisungen von Benutzern zu Projekten' });
    }
}

export async function assignUserToProject(req: Request, res: Response) {
    const { project_id, user_id } = req.body;
    try {
        const newAssignment = await ProjectUser.create({ project_id, user_id });
        res.status(201).json(newAssignment);
    } catch (error) {
        console.error('Fehler beim Zuweisen des Benutzers zum Projekt:', error);
        res.status(500).json({ error: 'Fehler beim Zuweisen des Benutzers zum Projekt' });
    }
}
