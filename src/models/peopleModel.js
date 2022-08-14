import { Sequelize } from 'sequelize';
import db from '../config/db.js';
import Category from './categoryModel.js';
import Step from './stepModel.js';
import Vote from './voteModel.js';

const { DataTypes } = Sequelize;

// Define schema
// @table people
const People = db.define('people', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    job: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    place: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    vote: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
  },{
    freezeTableName: true,
}, );

People.belongsTo(Category, {
    foreignKey: 'category_id',
});

People.hasMany(Step, {
    as: 'steps',
    foreignKey: 'people_id'
})

People.hasMany(Vote, {
    as: 'votes',
    foreignKey: 'people_id'
})

export default People