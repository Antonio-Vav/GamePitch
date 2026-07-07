import React, { useState } from 'react';
import { fetchData } from '../utils/fetchData';

function ProfilePage({ user, ideas, refreshIdeas }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [gameType, setGameType] = useState('RPG');
    const [devPlan, setDevPlan] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Shared style object to force Bootstrap inputs to use a Blue Glow on click
    const blueFocusStyle = { 
        '--bs-focus-ring-color': 'rgba(13, 110, 253, 0.25)', 
        borderColor: '#0d6efd' 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await fetchData('/games/create', 'POST', {
                userId: user._id,
                title,
                description,
                gameType,
                devPlan
            });

            setSuccess('Game pitch successfully posted!');
            setTitle('');
            setDescription('');
            setDevPlan('');
            refreshIdeas();
        } catch (err) {
            setError(err.message || 'Failed to create game pitch.');
        }
    };

    return (
        <div className="row g-4 text-white">
            {/* Left Column: Profile Info & Create Pitch Form */}
            <div className="col-md-5">
                <div className="card p-4 shadow bg-dark text-white border-secondary mb-4">
                    <h4 className="text-success fw-bold mb-1">User Profile</h4>
                    <p className="text-secondary small mb-3">Account details</p>
                    <div className="mb-2"><strong className="text-light">Username:</strong> <span className="text-white">{user.username}</span></div>
                    <div className="mb-2"><strong className="text-light">Full Name:</strong> <span className="text-white">{user.fullName}</span></div>
                    <div className="mb-0"><strong className="text-light">Email:</strong> <span className="text-white">{user.email}</span></div>
                </div>

                <div className="card p-4 shadow bg-dark text-white border-secondary">
                    <h4 className="text-primary fw-bold mb-3">Pitch a New Game</h4>
                    
                    {error && <div className="alert alert-danger p-2 small text-center">{error}</div>}
                    {success && <div className="alert alert-success p-2 small text-center">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-light small fw-bold">Game Title</label>
                            <input 
                                type="text" 
                                className="form-control bg-black text-white border-secondary" 
                                placeholder="Name your project"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={blueFocusStyle}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-light small fw-bold">Game Type / Genre</label>
                            <select 
                                className="form-select bg-black text-white border-secondary"
                                value={gameType}
                                onChange={(e) => setGameType(e.target.value)}
                                style={blueFocusStyle}
                            >
                                <option value="RPG">RPG</option>
                                <option value="FPS">FPS</option>
                                <option value="Platformer">Platformer</option>
                                <option value="Strategy">Strategy</option>
                                <option value="Sandbox">Sandbox</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-light small fw-bold">Description</label>
                            <textarea 
                                className="form-control bg-black text-white border-secondary" 
                                rows="3"
                                placeholder="What is your game about?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={blueFocusStyle}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-light small fw-bold">Development Plan</label>
                            <textarea 
                                className="form-control bg-black text-white border-secondary" 
                                rows="2"
                                placeholder="Tools, timeline, or notes..."
                                value={devPlan}
                                onChange={(e) => setDevPlan(e.target.value)}
                                style={blueFocusStyle}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 fw-bold">
                            Publish Pitch
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Column: Display User's Existing Game Pitches */}
            <div className="col-md-7">
                <h3 className="fw-bold mb-4 text-white">Your Game Pitches ({ideas.length})</h3>
                
                {ideas.length === 0 ? (
                    <div className="card p-5 text-center bg-dark border-secondary text-secondary">
                        <p className="mb-0">You haven't pitched any games yet. Use the form to submit your first idea!</p>
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {ideas.map((idea) => (
                            <div key={idea._id} className="card p-4 bg-dark border-secondary text-white shadow-sm">
                                <div className="d-flex justify-content-between align-items-start border-bottom border-secondary pb-2 mb-2">
                                    <h5 className="text-success fw-bold mb-0">{idea.title}</h5>
                                    <span className="badge bg-secondary text-white">{idea.gameType}</span>
                                </div>
                                <p className="mb-3 text-light" style={{ whiteSpace: 'pre-wrap' }}>{idea.description}</p>
                                {idea.devPlan && (
                                    <div className="bg-black p-2 rounded border border-secondary small">
                                        <strong className="text-secondary d-block mb-1">Development Plan:</strong>
                                        <span className="text-light">{idea.devPlan}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;