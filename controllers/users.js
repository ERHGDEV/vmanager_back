const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const authenticateToken = require('../utils/middleware').authenticateToken

usersRouter.post('/api/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(400).send('User not found')

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).send('Invalid password')

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Ruta temporal para agregar usuario

/* usersRouter.post('/api/temp-add-user', async (req, res) => {
    const { username, password, role, vacationDays, usedDays } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({ username, password: hashedPassword, role, vacationDays, usedDays })
      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }) */

usersRouter.get('/api/users', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403)
    
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
      
usersRouter.get('/api/users/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) return res.sendStatus(403)
    
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
      
usersRouter.post('/api/users', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403)
    const { username, password, role, vacationDays, usedDays } = req.body
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashedPassword, role, vacationDays, usedDays })
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
      
usersRouter.put('/api/users/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) return res.sendStatus(403)
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
      
usersRouter.delete('/api/users/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403)
    
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'Usuario eliminado' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = usersRouter