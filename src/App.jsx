import React, { useState } from 'react';
import Auth from './components/Auth';
import NotesDashboard from './components/NotesDashboard';

export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    if (!token) {
        return <Auth onLoginSuccess={() => setToken(localStorage.getItem('token'))} />;
    }

    return <NotesDashboard onLogout={handleLogout} />;
}