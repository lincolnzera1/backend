const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

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

server.listen(port, () => console.log("Server has been started"))