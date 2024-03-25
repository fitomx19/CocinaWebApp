// clientIO.js
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Reemplaza la URL con la dirección de tu servidor

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('message', 'Hello, server!'); // Enviar un mensaje al servidor
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;
