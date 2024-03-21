// controllers/projectController.js

import { Request, Response } from 'express';
import { Project } from '../models/project';

// Funktion zum Abrufen aller Projekte
export async function getAllProjects(req: Request, res: Response) {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error('Fehler beim Abrufen der Projekte:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Projekte' });
    }
}

export async function getProjectById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Projekt nicht gefunden' });
        }
        res.json(project);
    } catch (error) {
        console.error('Fehler beim Abrufen des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des Projekts' });
    }
}

// Funktion zum Erstellen eines neuen Projekts
export async function createProject(req: Request, res: Response) {
    const { name, description } = req.body;
    try {
        const newProject = await Project.create({ name, description });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Fehler beim Erstellen des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Erstellen des Projekts' });
    }
}

// Funktion zum Löschen eines Projekts
export async function deleteProject(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await Project.destroy({
            where: {
                id: id
            }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Fehler beim Löschen des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Löschen des Projekts' });
    }
}

// Funktion zum Aktualisieren eines Projekts
export async function updateProject(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        await Project.update({ name, description }, {
            where: {
                id: id
            }
        });
        res.status(200).send();
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Aktualisieren des Projekts' });
    }
}
