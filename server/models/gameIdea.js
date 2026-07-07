const mongoose = require('mongoose');

const gameIdeaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    gameType: { type: String, required: true },
    devPlan: { type: String, required: true },
    // Foreign Key link to the User who created it
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Custom CRUD functions for Game Ideas

// 1. CREATE: New pitch tied to a specific User
async function createGameIdea(userId, title, description, gameType, devPlan) {
    const newIdea = new GameIdea({ userId, title, description, gameType, devPlan });
    return await newIdea.save();
}

// 2. READ: Get a specific pitch by its ID
async function getGameIdeaById(id) {
    return await GameIdea.findById(id).populate('userId', 'username email fullName');
}

// 3. UPDATE: Edit a pitch
async function updateGameIdea(id, updateData) {
    return await GameIdea.findByIdAndUpdate(id, updateData, { new: true });
}

// 4. DELETE: Remove a pitch
async function deleteGameIdea(id) {
    return await GameIdea.findByIdAndDelete(id);
}

// Find all game pitches matching a specific user ID
async function getGameIdeasByUserId(userId) {
    return await GameIdea.find({ userId: new mongoose.Types.ObjectId(userId) });
}

const GameIdea = mongoose.model('GameIdea', gameIdeaSchema);

module.exports = { GameIdea, createGameIdea, getGameIdeaById, updateGameIdea, deleteGameIdea, getGameIdeasByUserId };