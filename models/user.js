const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    vacationDays: { type: Number, default: 0 },
    usedDays: { type: Number, default: 0 }
})

module.exports = mongoose.model('User', userSchema)