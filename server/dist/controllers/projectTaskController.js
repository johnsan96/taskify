"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTaskToProject = exports.getProjectTasks = void 0;
const projectTask_1 = require("../models/projectTask");
async function getProjectTasks(req, res) {
    try {
        const projectTasks = await projectTask_1.ProjectTask.findAll();
        res.json(projectTasks);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Zuweisungen von Aufgaben zu Projekten:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Zuweisungen von Aufgaben zu Projekten' });
    }
}
exports.getProjectTasks = getProjectTasks;
async function assignTaskToProject(req, res) {
    const { project_id, task_id } = req.body;
    try {
        const newAssignment = await projectTask_1.ProjectTask.create({ project_id, task_id });
        res.status(201).json(newAssignment);
    }
    catch (error) {
        console.error('Fehler beim Zuweisen der Aufgabe an das Projekt:', error);
        res.status(500).json({ error: 'Fehler beim Zuweisen der Aufgabe an das Projekt' });
    }
}
exports.assignTaskToProject = assignTaskToProject;
