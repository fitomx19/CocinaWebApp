import React from 'react';
import NotificationComponent from './components/NotificationComponent';
import './App.css'; 


function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Restaurante los cacomixtles</h1>
      </header>
      <div className="content">
        <NotificationComponent />
      </div>
    </div>
  );
}

export default App;
