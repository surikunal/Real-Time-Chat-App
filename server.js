//? creating server using socket.io is really easy
const io = require('socket.io')(3000)      // that is how a server is created

const users = {}

//? this is going to load up each time a user opens a chat box
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });     //? this will send the message to every single user connected in the server except the sender        
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);     //? this will send the message to every single user connected in the server except the sender        
        delete users[socket.id]
    })
})