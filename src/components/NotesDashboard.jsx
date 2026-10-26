import React, { useState, useEffect } from 'react';
import api from '../services/api';
import HeroSection from './HeroSection';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

export default function NotesDashboard({ onLogout }) {

    const currentUsername = localStorage.getItem('username') || 'User';
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingId, setEditingId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    const [loadingAiId, setLoadingAiId] = useState(null);
    const [aiResults, setAiResults] = useState({});

    const [searchTerm, setSearchTerm] = useState('');
   // Pehle se saved theme check karega, agar nahi hai toh default 'dark' rakhega
    const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
    });


    useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const fetchNotes = async () => {
        try {
            const response = await api.get('/notes');
            setNotes(response.data);
        } catch (err) {
            setError('Failed to load notes');
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editingId) {
                await api.put(`/notes/${editingId}`, { title, content });
                setSuccessMessage('Note updated successfully! ✨');
                setEditingId(null);
            } else {
                await api.post('/notes', { title, content });
                setSuccessMessage('Note created successfully! 🚀');
            }
            setTitle('');
            setContent('');
            fetchNotes();
        } catch (err) {
            setError('Failed to save note');
        }
    };

    const handleEditClick = (note) => {
        setEditingId(note.id);
        setTitle(note.title);
        setContent(note.content);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setContent('');
    };

    const promptDelete = (id) => {
        setNoteToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteNote = async () => {
        try {
            await api.delete(`/notes/${noteToDelete}`);
            setSuccessMessage('Note deleted successfully! 🗑️');
            fetchNotes();
        } catch (err) {
            setError('Failed to delete note');
        } finally {
            setShowDeleteModal(false);
            setNoteToDelete(null);
        }
    };

    const handleAiSimplify = async (id, closeOnly = false) => {
        if (closeOnly) {
            setAiResults(prev => ({ ...prev, [id]: null }));
            return;
        }

        setLoadingAiId(id);
        setError('');
        try {
            const response = await api.post(`/notes/${id}/simplify`);
            const aiResult = response.data.simplifiedContent;
            
            setAiResults(prev => ({ ...prev, [id]: aiResult }));
            setSuccessMessage('Note simplified by AI successfully! 💡');
        } catch (err) {
            setError('Failed to simplify note with AI');
        } finally {
            setLoadingAiId(null);
        }
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const theme = {
        bgGradient: isDarkMode 
            ? 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%)' 
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        cardBg: isDarkMode ? 'rgba(30, 41, 59, 0.75)' : 'rgba(255, 255, 255, 0.9)',
        cardBorder: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.8)',
        text: isDarkMode ? '#f8fafc' : '#1e293b',
        subText: isDarkMode ? '#94a3b8' : '#64748b',
        inputBg: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.9)',
        inputBorder: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: theme.bgGradient, 
            color: theme.text, 
            padding: '40px 20px', 
            transition: 'all 0.4s ease', 
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif" 
        }}>
            
            {/* Toast Notification */}
            {successMessage && (
                <div style={{ position: 'fixed', top: '25px', right: '25px', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '12px 24px', borderRadius: '10px', boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)', zIndex: 1000, fontWeight: '600', backdropFilter: 'blur(10px)' }}>
                    {successMessage}
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: theme.cardBg, backdropFilter: 'blur(20px)', padding: '25px', borderRadius: '16px', width: '320px', textAlign: 'center', border: theme.cardBorder, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
                        <h3 style={{ marginTop: 0, color: theme.text }}>Are you sure?</h3>
                        <p style={{ color: theme.subText, fontSize: '14px' }}>Do you really want to delete this note permanently?</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
                            <button onClick={confirmDeleteNote} style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                                Yes, Delete
                            </button>
                            <button onClick={() => setShowDeleteModal(false)} style={{ padding: '10px 18px', background: isDarkMode ? '#334155' : '#e2e8f0', color: theme.text, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Container set to ~70% max-width for premium centered focus */}
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                
                {/* Hero Section Component */}
                <HeroSection 
                    isDarkMode={isDarkMode} 
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
                    onLogout={onLogout} 
                    username={currentUsername}
                />

                {error && <p style={{ color: '#f87171', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '20px' }}>{error}</p>}

                {/* Search Bar */}
                <div style={{ marginBottom: '30px' }}>
                    <input 
                        type="text" 
                        placeholder="Search across your notes..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        style={{ width: '100%', padding: '16px 20px', boxSizing: 'border-box', borderRadius: '14px', border: theme.inputBorder, backgroundColor: theme.inputBg, color: theme.text, outline: 'none', backdropFilter: 'blur(10px)', fontSize: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                    />
                </div>

                {/* Note Form Component */}
                <NoteForm 
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    handleSubmit={handleSubmit}
                    editingId={editingId}
                    handleCancelEdit={handleCancelEdit}
                    isDarkMode={isDarkMode}
                />

               {/* Notes Feed Header */}
                <h3 style={{ marginBottom: '20px', fontSize: '20px', color: theme.text, fontWeight: '700' }}>📚 Your Workspace Notes</h3>
                
                {filteredNotes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', background: theme.cardBg, borderRadius: '16px', border: theme.cardBorder }}>
                        <p style={{ color: theme.subText, margin: 0, fontSize: '16px' }}>No notes found. Create your first note above! 🚀</p>
                    </div>
                ) : (
                    /* 1 Card per row (Full width stack) */
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '20px' 
                    }}>
                        {filteredNotes.map((note) => (
                            <NoteCard 
                                key={note.id}
                                note={note}
                                isDarkMode={isDarkMode}
                                onAiSimplify={handleAiSimplify}
                                onEdit={handleEditClick}
                                onDelete={promptDelete}
                                aiResult={aiResults[note.id]}
                                isLoadingAi={loadingAiId === note.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}