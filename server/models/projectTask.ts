import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db';

export const ProjectTask = sequelize.define('project_task', {
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    task_id: {
        type: DataTypes.INTEGER,
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

