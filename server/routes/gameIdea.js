const express = require('express');
const router = express.Router();
const gameModel = require('../models/gameIdea');

// 1. CREATE: Route to Pitch a New Game (Requires userId)
router.post('/create', async (req, res) => {
    try {
        const { userId, title, description, gameType, devPlan } = req.body;
        const newPitch = await gameModel.createGameIdea(userId, title, description, gameType, devPlan);
        res.status(201).json(newPitch);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. READ: Route to Get a Specific Game Pitch
router.get('/:id', async (req, res) => {
    try {
        const pitch = await gameModel.getGameIdeaById(req.params.id);
        if (!pitch) return res.status(404).json({ message: "Game idea not found" });
        res.json(pitch);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. UPDATE: Route to Edit an Existing Game Pitch
router.put('/:id', async (req, res) => {
    try {
        const updatedPitch = await gameModel.updateGameIdea(req.params.id, req.body);
        res.json(updatedPitch);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. DELETE: Route to Remove a Game Pitch
router.delete('/:id', async (req, res) => {
    try {
        await gameModel.deleteGameIdea(req.params.id);
        res.json({ message: "Game pitch deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. READ ALL BY USER: Get all game pitches belonging to a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const pitches = await gameModel.getGameIdeasByUserId(req.params.userId);
        res.json(pitches);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;