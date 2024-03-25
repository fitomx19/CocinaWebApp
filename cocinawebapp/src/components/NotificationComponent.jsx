import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './NotificationComponent.css';

function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('message', 'Hello, server!');
    });

    socket.on('databaseChange', (change) => {
      console.log('Database change:', change);
      // Agregar el nuevo pedido al principio del array usando unshift()
      setNotifications(prevNotifications => [change, ...prevNotifications]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const dismissNotification = (notification) => {
    setNotifications(prevNotifications => prevNotifications.filter(n => n !== notification));
  };

  return (
    <>
    <center><h2>Notificaciones</h2></center>
    <div className="notification-container">
      
      {notifications.map((notification, index) => (
        <div className="notification" key={index}>
          <h2>Pedido Recibido</h2>
          <p>Total: ${notification.total}</p>
          <p>Estado: {notification.estado}</p>
          {notification.pedido.map((producto, index) => (
            <div key={index}>
              <p>Producto: {producto.producto}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <p>Precio: ${producto.precio}</p>
              <p>Variante: {producto.variante}</p>
            </div>
          ))}
          <p>Comentarios {notification.comments}</p>
          <button onClick={() => dismissNotification(notification)}>Descartar</button>
        </div>
      ))}
    </div></>
  );
}

export default NotificationComponent;
