// import path from 'path'
import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { connectDB, syncDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import peopleRoutes from './routes/peopleRoutes.js'
import cookieParser from 'cookie-parser'

const startServer = async () => {

  dotenv.config()
  await connectDB()

  const app = express()
  const server = http.createServer(app)
  
  const corsOptions = {
    origin: [
      'http://localhost:3000', 
      'http://localhost:3003', 
      'http://localhost:3004', 
      'http://localhost:3005', 
      'http://localhost:3006',
    ],
    methods:["GET" , "POST" , "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  }

  app.use(cors(corsOptions))
  app.use(express.json({limit: '10mb'}))
  app.use(express.urlencoded({limit: '10mb'}))
  app.use(cookieParser());

  app.use('/api/users', userRoutes)
  app.use('/api/people', peopleRoutes)
  app.get('/', (_, res) => res.send('API is running....'))
  
  app.use(notFound)
  app.use(errorHandler)
  
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    syncDB()
  }

  const PORT = process.env.PORT || 5555
  server.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
  )
}

export default startServer