const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// Route to Login/Verify a User
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.loginUser(username, password);
        res.status(200).json({ message: "Login successful!", user });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

// 1. CREATE: Route to Register a User
router.post('/register', async (req, res) => {
    try {
        const { username, fullName, email, password } = req.body;
        const user = await userModel.createUser(username, fullName, email, password);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. READ: Route to Get a User by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. UPDATE: Route to Edit a User's Info
router.put('/:id', async (req, res) => {
    try {
        const user = await userModel.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. DELETE: Route to Remove a User
router.delete('/:id', async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.json({ message: "User successfully deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;