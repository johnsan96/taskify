"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUser = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.ProjectUser = db_1.sequelize.define('project_user', {
    project_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'project_users',
    timestamps: false
});
