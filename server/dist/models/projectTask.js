"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTask = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.ProjectTask = db_1.sequelize.define('project_task', {
    project_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    task_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'tasks',
            key: 'id'
        }
    }
}, {
    tableName: 'project_tasks',
    timestamps: false
});
