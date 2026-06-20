const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    // Foreign Key links to both the User and the Game Idea
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gameIdeaId: { type: mongoose.Schema.Types.ObjectId, ref: 'GameIdea', required: true }
}, { timestamps: true });

// Custom CRUD Functions

// 1. CREATE
async function createReview(userId, gameIdeaId, content, rating) {
    const newReview = new Review({ userId, gameIdeaId, content, rating });
    return await newReview.save();
}

// 2. READ
async function getReviewById(id) {
    return await Review.findById(id)
        .populate('userId', 'username fullName')
        .populate('gameIdeaId', 'title');
}

// 3. UPDATE (Just updates text)
async function updateReviewContent(id, newContent) {
    return await Review.findByIdAndUpdate(id, { content: newContent }, { new: true });
}

// 4. DESTROY
async function deleteReview(id) {
    return await Review.findByIdAndDelete(id);
}

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review, createReview, getReviewById, updateReviewContent, deleteReview };