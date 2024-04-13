import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomeComponent';
import Notifications from './components/NotificationComponent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Restaurante los cacomixtles</h1>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
