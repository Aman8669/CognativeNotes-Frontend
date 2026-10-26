import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function Auth({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            {isLogin ? (
                <Login 
                    onLoginSuccess={onLoginSuccess} 
                    switchToRegister={() => setIsLogin(false)} 
                />
            ) : (
                <Register 
                    switchToLogin={() => setIsLogin(true)} 
                />
            )}
        </div>
    );
}