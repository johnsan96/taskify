"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.putTask = exports.getTask = exports.postTask = exports.getTasks = void 0;
const task_1 = require("../models/task");
const projectTask_1 = require("../models/projectTask");
const taskAssignee_1 = require("../models/taskAssignee");
// Funktion zum Abrufen aller Aufgaben
async function getTasks(req, res) {
    try {
        const task = await task_1.Task.findAll();
        res.json(task);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Aufgaben:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Aufgaben' });
    }
}
exports.getTasks = getTasks;
// Funktion zum Erstellen einer neuen Aufgabe
async function postTask(req, res) {
    const { name, description } = req.body;
    try {
        const newTask = await task_1.Task.create({ name, description });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error('Fehler beim Erstellen der Aufgabe:', error);
        res.status(500).json({ error: 'Fehler beim Erstellen der Aufgabe' });
    }
}
exports.postTask = postTask;
// Funktion zum Abrufen einer bestimmten Aufgabe anhand der ID
async function getTask(req, res) {
    const taskId = req.params.id;
    try {
        const task = await task_1.Task.findByPk(taskId);
        if (!task) {
            res.status(404).json({ message: 'Aufgabe nicht gefunden' });
            return;
        }
        res.json(task);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Aufgabe:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Aufgabe' });
    }
}
exports.getTask = getTask;
// Funktion zum Aktualisieren einer Aufgabe anhand der ID
async function putTask(req, res) {
    const taskId = req.params.id;
    const { name, description, status_id } = req.body;
    try {
        const task = await task_1.Task.findByPk(taskId);
        if (!task) {
            res.status(404).json({ message: 'Aufgabe nicht gefunden' });
            return;
        }
        await task.update({ name, description, status_id });
        res.json({ message: 'Aufgabe erfolgreich aktualisiert' });
    }
    catch (error) {
        console.error('Fehler beim Aktualisieren der Aufgabe:', error);
        res.status(500).json({ error: 'Fehler beim Aktualisieren der Aufgabe' });
    }
}
exports.putTask = putTask;
// Funktion zum Löschen einer Aufgabe anhand der ID
async function deleteTask(req, res) {
    const taskId = req.params.id;
    try {
        const task = await task_1.Task.findByPk(taskId);
        await projectTask_1.ProjectTask.destroy({ where: { task_id: taskId } });
        await taskAssignee_1.TaskAssignee.destroy({ where: { task_id: taskId } });
        if (!task) {
            res.status(404).json({ message: 'Aufgabe nicht gefunden' });
            return;
        }
        await task.destroy();
        res.json({ message: 'Aufgabe erfolgreich gelöscht' });
    }
    catch (error) {
        console.error('Fehler beim Löschen der Aufgabe:', error);
        res.status(500).json({ error: 'Fehler beim Löschen der Aufgabe' });
    }
}
exports.deleteTask = deleteTask;
