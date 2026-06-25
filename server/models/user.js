const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Custom CRUD functions for User
// 1. CREATE User
async function createUser(username, fullName, email, password) {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, fullName, email, password: hashedPassword });
    return await newUser.save();
}

// 2. READ User
async function getUserById(id) {
    return await User.findById(id);
}

// 3. UPDATE User
async function updateUser(id, updateData) {
    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    return await User.findByIdAndUpdate(id, updateData, { new: true });
}

// 4. DELETE User
async function deleteUser(id) {
    return await User.findByIdAndDelete(id);
}

// 5. LOGIN/VERIFY
async function loginUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');
    
    // Compare incoming plain text password against the hashed string in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Wrong Password');
    
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = { User, createUser, getUserById, updateUser, deleteUser, loginUser };