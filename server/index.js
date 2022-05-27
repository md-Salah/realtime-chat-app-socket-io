const express = require('express')
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
})

io.on('connection', (socket) =>{
    // console.log('Socket Connection established user id: ' + socket.id)

    socket.on('join_room', (data) =>{
        socket.join(data.room)
        //console.log('User name: ' + data.username + ' joined room: ' + data.room)
    })

    socket.on('send_message', (data) =>{
        socket.to(data.room).emit('receive_message', data)
        //console.log(data.message, data.room, data.time, data.author)
    })

    socket.on('disconnect', () =>{
        console.log('Socket disconnected')
    })
})

PORT = process.env.PORT || 3001
server.listen(PORT, ()=>{console.log(`Server listening on port ${PORT}`)})