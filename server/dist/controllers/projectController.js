"use strict";
// controllers/projectController.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.deleteProject = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
const project_1 = require("../models/project");
const projectUsers_1 = require("../models/projectUsers");
const projectTask_1 = require("../models/projectTask");
// Funktion zum Abrufen aller Projekte
async function getAllProjects(req, res) {
    try {
        const projects = await project_1.Project.findAll();
        res.json(projects);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Projekte:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Projekte' });
    }
}
exports.getAllProjects = getAllProjects;
async function getProjectById(req, res) {
    const { id } = req.params;
    try {
        const project = await project_1.Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Projekt nicht gefunden' });
        }
        res.json(project);
    }
    catch (error) {
        console.error('Fehler beim Abrufen des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des Projekts' });
    }
}
exports.getProjectById = getProjectById;
// Funktion zum Erstellen eines neuen Projekts
async function createProject(req, res) {
    const { name, description } = req.body;
    try {
        const newProject = await project_1.Project.create({ name, description });
        res.status(201).json(newProject);
    }
    catch (error) {
        console.error('Fehler beim Erstellen des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Erstellen des Projekts' });
    }
}
exports.createProject = createProject;
// Funktion zum Löschen eines Projekts
async function deleteProject(req, res) {
    const { id } = req.params;
    try {
        await projectTask_1.ProjectTask.destroy({ where: { project_id: id } });
        await projectUsers_1.ProjectUser.destroy({ where: { project_id: id } });
        await project_1.Project.destroy({
            where: {
                id: id
            }
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Fehler beim Löschen des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Löschen des Projekts' });
    }
}
exports.deleteProject = deleteProject;
// Funktion zum Aktualisieren eines Projekts
async function updateProject(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        await project_1.Project.update({ name, description }, {
            where: {
                id: id
            }
        });
        res.status(200).send();
    }
    catch (error) {
        console.error('Fehler beim Aktualisieren des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Aktualisieren des Projekts' });
    }
}
exports.updateProject = updateProject;
