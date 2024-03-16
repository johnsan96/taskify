"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAssignee = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.TaskAssignee = db_1.sequelize.define('task_assignee', {
    task_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'task',
            key: 'id'
        }
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    tableName: 'task_assignee',
    timestamps: false
});
