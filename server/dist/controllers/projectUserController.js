"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignUserToProject = exports.getProjectUsers = void 0;
const projectUsers_1 = require("../models/projectUsers");
async function getProjectUsers(req, res) {
    try {
        const projectUsers = await projectUsers_1.ProjectUser.findAll();
        res.json(projectUsers);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Zuweisungen von Benutzern zu Projekten:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Zuweisungen von Benutzern zu Projekten' });
    }
}
exports.getProjectUsers = getProjectUsers;
async function assignUserToProject(req, res) {
    const { project_id, user_id } = req.body;
    try {
        const newAssignment = await projectUsers_1.ProjectUser.create({ project_id, user_id });
        res.status(201).json(newAssignment);
    }
    catch (error) {
        console.error('Fehler beim Zuweisen des Benutzers zum Projekt:', error);
        res.status(500).json({ error: 'Fehler beim Zuweisen des Benutzers zum Projekt' });
    }
}
exports.assignUserToProject = assignUserToProject;
