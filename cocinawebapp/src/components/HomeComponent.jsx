import React, { useState, useEffect } from 'react';
import './Login.css';
import handleLogin from '../hooks/loginHook';
import { useNavigate } from 'react-router-dom'; 

function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberUser, setRememberUser] = useState(false);  

    const navigate = useNavigate();

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        console.log('rememberedUser:', rememberedUser);
        if (rememberedUser) {
            setEmail(rememberedUser);
            setRememberUser(true);
        }
    }, []); // Ejecutar solo una vez al montar el componente

    const handlePostLogin = async (e) => {
        e.preventDefault();
        
        try {
            const respuesta = await handleLogin({ "username": email, "password": password });

            if (respuesta.token) {
                localStorage.setItem('token', respuesta.token);
                localStorage.setItem('role', respuesta.user.role);
                localStorage.setItem('tienda', respuesta.user.tienda);

                if (rememberUser) {
                    localStorage.setItem('rememberedUser', email);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                navigate('/notifications');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handlePostLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={rememberUser}
                        onChange={(e) => setRememberUser(e.target.checked)} 
                    />
                    <label htmlFor="remember">Recordar usuario</label>
                </div>
                <button className='button' type="submit">Iniciar sesión</button>
            </form>
            <p>Versión 0.1</p> {/* Leyenda de versión */}
        </div>
    );
}

export default Home;
