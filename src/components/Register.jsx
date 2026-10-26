import React, { useState } from 'react';
import api from '../services/api';
import './Auth.css';

export default function Register({ switchToLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (username.trim().length < 3) {
            setError('Username must be at least 3 characters long.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be 8+ chars with uppercase, lowercase, number, and special character (@$!%*?&).');
            return;
        }

        if (password !== rePassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            await api.post('/auth/register', { username, password, rePassword });
            setSuccessMessage('Registration successful! Redirecting to login...');
            setTimeout(() => {
                switchToLogin();
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed! Username might already exist.');
        }
    };

    return (
        <div className="auth-container">
            {/* Left Brand Panel */}
            <div className="auth-brand-panel">
                <h1>Join CognitiveNotes 🧠</h1>
                <p>Create an account to unlock AI-powered summaries, smart categorization, and secure cloud notes.</p>
            </div>

            {/* Right Form Panel */}
            <div className="auth-form-panel">
                <div className="auth-card">
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Start your productivity journey today.</p>
                    
                    {error && <div className="auth-error">{error}</div>}
                    {successMessage && <div className="auth-success">{successMessage}</div>}
                    
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                placeholder="Choose a username"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="8+ chars, 1 upper, 1 number, 1 symbol"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input 
                                type="password" 
                                placeholder="Re-enter your password"
                                value={rePassword} 
                                onChange={(e) => setRePassword(e.target.value)} 
                                required 
                            />
                        </div>

                        <button type="submit" className="auth-btn">
                            Create Account
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account?{' '}
                        <span onClick={switchToLogin}>Sign In</span>
                    </p>
                </div>
            </div>
        </div>
    );
}