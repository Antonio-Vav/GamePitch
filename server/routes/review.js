const express = require('express');
const router = express.Router();
const reviewModel = require('../models/review');

// 1. CREATE Route (POST)
router.post('/create', async (req, res) => {
    try {
        const { userId, gameIdeaId, content, rating } = req.body;
        const review = await reviewModel.createReview(userId, gameIdeaId, content, rating);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. READ Route (GET)
router.get('/:id', async (req, res) => {
    try {
        const review = await reviewModel.getReviewById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. UPDATE Route (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const updatedReview = await reviewModel.updateReviewContent(req.params.id, content);
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. DESTROY Route (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await reviewModel.deleteReview(req.params.id);
        res.json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;