import { Sequelize } from 'sequelize';
import db from '../config/db.js';

const { DataTypes } = Sequelize;

// Define schema
// @table votes
const Vote = db.define('votes', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    voter_id: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
  },{
    freezeTableName: true,
}, );

export default Vote