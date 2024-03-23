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
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Achten Sie darauf, ob Sie NULL-Werte zulassen möchten
        defaultValue: 1 // Setzen Sie den Standardwert auf 1 oder den Wert, der dem Standardstatus entspricht
    }
},
{
    tableName: 'task',
    timestamps: false
}

)

