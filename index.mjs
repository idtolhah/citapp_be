import startServer from "./server.js"
import cluster from "./cluster.js"
import dotenv from 'dotenv'

dotenv.config()

// console.log("==================>" + parseInt(process.env.CLUSTERING))
if (parseInt(process.env.CLUSTERING) === 1) {
    cluster(() => {
        if (process.send) process.send({ pid: process.pid, message: "This is cluster!" });
        startServer()
    })
} else {
    startServer()
}