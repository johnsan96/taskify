import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db';

export const ProjectUser = sequelize.define('project_user', {
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
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


