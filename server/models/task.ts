import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db'

export const Task = sequelize.define("task", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'task',
    timestamps: false
}

)

