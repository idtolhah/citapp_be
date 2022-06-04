import dotenv from 'dotenv'
import db, { connectDB } from './config/db.js'
import User from './models/userModel.js'
import users from './data/users.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await db.query("SET @@global.sql_mode= ''", null, {})
    await db.query("SET global net_buffer_length=1000000;", null, {})
    await db.query("SET global max_allowed_packet=1000000000;", null, {})

    // Master
    await User.bulkCreate(users)
    console.log('Master Data Imported!')
    
    console.log('All dummy data Imported!')

    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await db.query('SET FOREIGN_KEY_CHECKS = 0', null, {})

    await User.destroy({where: {}, truncate: { cascade: true }})    
    console.log('Master Data Destroyed!')

    await db.query('SET FOREIGN_KEY_CHECKS = 1', null, {})
    
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
