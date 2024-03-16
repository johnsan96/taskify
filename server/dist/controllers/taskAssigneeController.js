"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTaskToUser = exports.getTaskAssignees = void 0;
const taskAssignee_1 = require("../models/taskAssignee");
async function getTaskAssignees(req, res) {
    try {
        const taskAssignees = await taskAssignee_1.TaskAssignee.findAll();
        res.json(taskAssignees);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Zuweisungen von Aufgaben zu Benutzern:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Zuweisungen von Aufgaben zu Benutzern' });
    }
}
exports.getTaskAssignees = getTaskAssignees;
async function assignTaskToUser(req, res) {
    const { task_id, user_id } = req.body;
    try {
        const newAssignment = await taskAssignee_1.TaskAssignee.create({ task_id, user_id });
        res.status(201).json(newAssignment);
    }
    catch (error) {
        console.error('Fehler beim Zuweisen der Aufgabe an den Benutzer:', error);
        res.status(500).json({ error: 'Fehler beim Zuweisen der Aufgabe an den Benutzer' });
    }
}
exports.assignTaskToUser = assignTaskToUser;
