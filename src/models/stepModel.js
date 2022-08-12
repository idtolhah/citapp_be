import { Sequelize } from 'sequelize';
import db from '../config/db.js';
import People from './peopleModel.js';

const { DataTypes } = Sequelize;

// Define schema
// @table steps
const Step = db.define('steps', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  },{
    freezeTableName: true,
}, );

export default Step