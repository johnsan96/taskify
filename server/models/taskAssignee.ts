import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db'; 

export const TaskAssignee = sequelize.define('task_assignee', {
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'task', 
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
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
