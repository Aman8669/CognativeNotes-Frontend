import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Edit, Trash2, Wand2 } from 'lucide-react';

export default function NoteCard({ note, isDarkMode, onAiSimplify, onEdit, onDelete, aiResult, isLoadingAi }) {
    const theme = {
        cardBg: isDarkMode ? 'rgba(30, 41, 59, 0.75)' : 'rgba(255, 255, 255, 0.9)',
        cardBorder: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.8)',
        text: isDarkMode ? '#f8fafc' : '#1e293b',
        subText: isDarkMode ? '#94a3b8' : '#64748b',
        aiBoxBg: isDarkMode ? 'rgba(88, 28, 135, 0.25)' : 'rgba(243, 232, 255, 0.85)',
        aiBorder: isDarkMode ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid #d8b4fe',
    };

    return (
        <div style={{ 
            background: theme.cardBg, 
            backdropFilter: 'blur(20px)', 
            border: theme.cardBorder, 
            padding: '24px', 
            borderRadius: '16px', 
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            boxSizing: 'border-box'
        }}>
            <div>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: theme.text, fontWeight: '700' }}>{note.title}</h4>
                <p style={{ margin: '0 0 15px 0', color: theme.subText, whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '14px' }}>{note.content}</p>
                
                {aiResult && (
                    <div style={{ background: theme.aiBoxBg, border: theme.aiBorder, padding: '16px', borderRadius: '12px', marginBottom: '16px', marginTop: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.15)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: isDarkMode ? '1px solid rgba(168, 85, 247, 0.2)' : '1px solid #e9d5ff', paddingBottom: '8px' }}>
                            <strong style={{ color: '#c084fc', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Sparkles size={14} /> AI INSIGHT & SUMMARY
                            </strong>
                            <button 
                                onClick={() => onAiSimplify(note.id, true)} 
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.subText, fontSize: '16px', fontWeight: 'bold' }}
                                title="Close AI View"
                            >
                                ✕
                            </button>
                        </div>
                        <div style={{ fontSize: '14px', lineHeight: '1.7', color: theme.text }}>
                            <ReactMarkdown>{aiResult}</ReactMarkdown>
                        </div>
                    </div>
                )}

                {isLoadingAi && (
                    <div style={{ fontStyle: 'italic', color: '#c084fc', marginBottom: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Wand2 size={16} className="animate-spin" /> Groq AI is generating insights...
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '15px', borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
                <button 
                    onClick={() => onAiSimplify(note.id)} 
                    disabled={isLoadingAi}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: isLoadingAi ? '#9333ea' : 'linear-gradient(135deg, #9333ea, #7e22ce)', color: 'white', border: 'none', borderRadius: '8px', cursor: isLoadingAi ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)' }}
                >
                    <Wand2 size={15} />
                    {isLoadingAi ? 'Thinking...' : 'Simplify with AI'}
                </button>
                <button onClick={() => onEdit(note)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                    <Edit size={14} />
                    Edit
                </button>
                <button onClick={() => onDelete(note.id)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                    <Trash2 size={14} />
                    Delete
                </button>
            </div>
        </div>
    );
}