import React from 'react';
import { Sparkles, Edit3, PlusCircle } from 'lucide-react';

export default function NoteForm({ title, setTitle, content, setContent, handleSubmit, editingId, handleCancelEdit, isDarkMode }) {
    const theme = {
        cardBg: isDarkMode ? 'rgba(30, 41, 59, 0.75)' : 'rgba(255, 255, 255, 0.9)',
        cardBorder: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.8)',
        text: isDarkMode ? '#f8fafc' : '#1e293b',
        inputBg: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.9)',
        inputBorder: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: theme.cardBg, backdropFilter: 'blur(20px)', padding: '28px', borderRadius: '20px', marginBottom: '35px', border: theme.cardBorder, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: theme.text, fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {editingId ? <Edit3 size={20} color="#f59e0b" /> : <Sparkles size={20} color="#3b82f6" />}
                {editingId ? 'Edit Note' : 'Create New Note'}
            </h3>
            <div style={{ marginBottom: '16px' }}>
                <input 
                    type="text" 
                    placeholder="Note Title..." 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '14px 18px', boxSizing: 'border-box', backgroundColor: theme.inputBg, color: theme.text, border: theme.inputBorder, borderRadius: '12px', outline: 'none', fontSize: '15px' }} 
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <textarea 
                    placeholder="Write down your thoughts, code snippet, or meeting summary..." 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                    rows="4" 
                    style={{ width: '100%', padding: '14px 18px', boxSizing: 'border-box', backgroundColor: theme.inputBg, color: theme.text, border: theme.inputBorder, borderRadius: '12px', outline: 'none', fontSize: '15px', resize: 'vertical' }} 
                />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 24px', background: editingId ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
                    <PlusCircle size={18} />
                    {editingId ? 'Update Note' : 'Save Note'}
                </button>
                {editingId && (
                    <button type="button" onClick={handleCancelEdit} style={{ padding: '12px 24px', background: isDarkMode ? '#334155' : '#e2e8f0', color: theme.text, border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}