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
  <center><h2>Notificaciones de la cocina</h2></center>
  <div className="user-info">
      {userName && <p>¡Hola, {userName}!</p>}
      <button className='blueButton'  onClick={handleLogout}>Cerrar sesión</button>
  </div>
  <div className="notification-container">
    
    {notifications.map((notification, index) => (
      <div className="notification" key={index}>
        <h2>Pedido Recibido</h2>
        <p>Total: ${notification.total}</p>
        <p>Estado: {notification.estado}</p>
        <p>Cantidad: {notification.pedido.reduce((total, item) => total + item.cantidad, 0)}</p>
        <p>Productos:</p>
        {notification.pedido.map((producto, index) => (
          <div key={index}>
            <p>  <b>{producto.producto.nombre}</b></p>
            <p>  Cantidad: {producto.cantidad}</p>
            <p>  Variante: {producto.producto.variantes.find(variante => variante._id === producto.variante).nombre}</p>
          </div>
        ))}
        <div className="comment-card">
              <h3>Comentarios:</h3>
              <p>{notification.comments}</p>
        </div>
       <div className='form-group'>
       <button className='redButton' onClick={() => dismissNotification(notification)}>Descartar</button>
       <button className='greenButton' onClick={() => dismissNotification(notification)}>Actualizar</button>
       </div>
      </div>
    ))}
  </div>
</>

  );
}

export default NotificationComponent;
