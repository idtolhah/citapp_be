import { Sequelize } from 'sequelize';
import db from '../config/db.js';
import User from './userModel.js';

const { DataTypes } = Sequelize;

// Define schema
// @table profiles
const Profile = db.define('profiles', {
    bio: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(1),
        allowNull: true,
    },
    // array
    achievements: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    skills: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    languages: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    hobbies: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    projects: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    experiences: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    educations: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    contacts: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  },{
        freezeTableName: true,
}, );

Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

export default Profile