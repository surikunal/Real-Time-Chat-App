const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name ?');
if (name != "") {
    appendMessage(`You are joined`);
    socket.emit('new-user', name);
}

socket.on('chat-message', data => {
    appendMessage(`${data.name} : ${data.message}`);
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You : ${message}`);
    socket.emit('send-chat-message', message);           // emit will just send the information from the CLIENT to the SERVER
    messageInput.value = '';    // to empty the chat box each time user submit a message
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}