import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './NotificationComponent.css';

function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    

    //revisar si el usuario tiene un token
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      window.location.href = '/';
    }


    console.log('Connecting to server...', __WEBSOCKET__);
    const socket = io(__WEBSOCKET__);

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('message', 'Hello, server!');
    });

    socket.on('databaseChange', (change) => {
      console.log('Database change:', change);
      // Agregar el nuevo pedido al principio del array usando unshift()
      setNotifications(prevNotifications => [change, ...prevNotifications]);
    });

    // Simular obtener el nombre de usuario desde el localStorage
    const storedUserName = localStorage.getItem('rememberedUser');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const dismissNotification = (notification) => {
    setNotifications(prevNotifications => prevNotifications.filter(n => n !== notification));
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión, como eliminar el token de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('tienda');
    localStorage.removeItem('rememberedUser');
    // Redireccionar al usuario a la página de inicio de sesión, por ejemplo
    window.location.href = '/';
  };

  return (
    <>
    <center><h2>Notificaciones</h2></center>
    <div className="notification-container">
      <div className="user-info">
        {userName && <p>¡Hola, {userName}!</p>}
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
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
    </div>
    </>
  );
}

export default NotificationComponent;
