import React from 'react';
import { Brain, LogOut, Sun, Moon, Sparkles } from 'lucide-react'; // 👈 Icons import kiye

export default function HeroSection({ isDarkMode, onToggleTheme, onLogout, username }) {
    return (
        <div style={{
            background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '28px 32px',
            marginBottom: '30px',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Professional Brain Icon */}
                <div style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)' }}>
                    <Brain size={28} color="#ffffff" />
                </div>
                <div>
                    <span style={{ 
                        background: 'linear-gradient(135deg, #a855f7, #3b82f6)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent', 
                        fontWeight: '800', 
                        fontSize: '26px',
                        display: 'block',
                        lineHeight: '1.2'
                    }}>
                        CognitiveNotes AI
                    </span>
                    <p style={{ margin: 0, color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Welcome back, <strong style={{ color: isDarkMode ? '#f8fafc' : '#1e293b' }}>{username || 'User'}</strong>! Supercharge thoughts with AI.
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button onClick={onToggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: isDarkMode ? '#f8fafc' : '#1e293b', border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #cbd5e1', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    {isDarkMode ? 'Light' : 'Dark'}
                </button>
                <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: 'linear-gradient(135deg, #ef4444, #b91c1c)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );
}