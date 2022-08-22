require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const dbPassword = process.env.DB_PASSWORD

const mongoUrl = `mongodb+srv://guilherme:${dbPassword}@cluster0.jiz8pb1.mongodb.net/nodeJourney?retryWrites=true&w=majority`

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


app.use(cors())

const port = process.env.PORT || 3001

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: `*`,
        methods: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {
    console.log( socket.id + " has been conected to the server!")

    socket.on("send.message", (data) => {
        console.log(data)
        //socket.broadcast.emit("send.message", data)
        io.emit("send.message", data)
    })
})

mongoose.connect(mongoUrl).then(() => {
    server.listen(port, () => console.log("Server has been started"))
}).catch((err) => {
    console.log("Um erro aconteceu: " + err)
})