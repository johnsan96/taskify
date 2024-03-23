"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.Task = db_1.sequelize.define("task", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // Setzen Sie den Standardwert auf 1 oder den Wert, der dem Standardstatus entspricht
    }
}, {
    tableName: 'task',
    timestamps: false
});
