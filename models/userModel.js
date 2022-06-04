import { Sequelize } from 'sequelize';
import db from '../config/db.js';
import bcrypt from 'bcryptjs';
 
const { DataTypes } = Sequelize;

// Define schema
// @table   users
const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  // image
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // basic info
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
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
  activities: {
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

// @desc    Hide password when listing
// @params  ''
User.prototype.toJSON =  function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

// @desc    Match entered password with stored hashed password in db
// @params  enteredPassword, storedPassword
const matchPassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword)
}

// @desc    Function to hash password
// @params  password
const hash = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export { matchPassword, hash}
export default User