import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(
  {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    // operatorsAliases: false,
    // dialectOptions: {
    //   useUTC: false, // for reading from database
    // },
    timezone: '+07:00', // for writing to database
    logging: false,
  }
)

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

const syncDB = () => {
  db.sync(
    {
      force: false
    }
  );
}

export { connectDB, syncDB }
export default db
