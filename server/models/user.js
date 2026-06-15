const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Custom CRUD functions for User
// 1. CREATE User
async function createUser(username, fullName, email, password) {
    const newUser = new User({ username, fullName, email, password });
    return await newUser.save();
}

// 2. READ User
async function getUserById(id) {
    return await User.findById(id);
}

// 3. UPDATE User
async function updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
}

// 4. DELETE User
async function deleteUser(id) {
    return await User.findByIdAndDelete(id);
}

const User = mongoose.model('User', userSchema);

module.exports = { User, createUser, getUserById, updateUser, deleteUser };