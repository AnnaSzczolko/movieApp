const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { readJSON, writeJSON } = require('../utils/file')

const router = express.Router()
const USERS_PATH = './data/users.json'
const SECRET = process.env.JWT_SECRET

// REGISTER
router.post('/register', async (req, res) => {
	try {

		const { name, email, password } = req.body
		
		const users = readJSON(USERS_PATH)
		
		const exists = users.find(u => u.email === email)
		if (exists) {
			return res.status(409).json({
				message: 'User already exists',
			})
		}
		
		if (!name || !name.trim()) {
			return res.status(400).json({ message: 'Name is required' })
		}
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' })
		}
		
		const hashedPassword = await bcrypt.hash(password, 10)
		
		const newUser = {
			id: Date.now(),
			name: name.trim(),
			email,
			password: hashedPassword,
			role: 'user',
		}
		
		users.push(newUser)
		writeJSON(USERS_PATH, users)
		
		const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET, { expiresIn: '1h' })
		
		res.status(201).json({
			message: 'User created',
			token,
			name: newUser.name,
		})
	} catch (error) {
		res.status(500).json({
			message: 'Registration failed',
		})
	}
})

// LOGIN
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({
				message: 'Email and password are required',
			})
		}

		const users = readJSON(USERS_PATH)

		const user = users.find(u => u.email === email)
		if (!user) {
			return res.status(401).json({
				message: 'Invalid credentials',
			})
		}

		const valid = await bcrypt.compare(password, user.password)
		if (!valid) {
			return res.status(401).json({
				message: 'Invalid credentials',
			})
		}

		const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' })

		res.json({ token, name: user.name })
	} catch (error) {
		res.status(500).json({
			message: 'Login failed',
		})
	}
})

module.exports = router
