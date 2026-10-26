import React, { useState } from 'react';
import api from '../services/api';
import './Auth.css';

export default function Login({ onLoginSuccess, switchToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            onLoginSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password!');
        }
    };

    return (
        <div className="auth-container">
            {/* Left Brand Panel */}
            <div className="auth-brand-panel">
                <h1>CognitiveNotes AI 🚀</h1>
                <p>Your intelligent second brain. Organize notes securely, summarize instantly with AI, and access anywhere.</p>
            </div>

            {/* Right Form Panel */}
            <div className="auth-form-panel">
                <div className="auth-card">
                    <h2>Welcome Back</h2>
                    <p className="auth-subtitle">Please enter your details to sign in.</p>
                    
                    {error && <div className="auth-error">{error}</div>}
                    
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                placeholder="Enter your username"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>

                        <button type="submit" className="auth-btn">
                            Sign In
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account?{' '}
                        <span onClick={switchToRegister}>Register</span>
                    </p>
                </div>
            </div>
        </div>
    );
}