const express = require('express')
const { readJSON, writeJSON } = require('../utils/file')
const auth = require('../middleware/auth')

const router = express.Router()

const FAVOURITES_PATH = './data/favourites.json'

router.get('/', auth, (req, res) => {
	try {
		const favourites = readJSON(FAVOURITES_PATH)

		const userFavourites = favourites.filter(fav => fav.userId === req.user.id)

		res.json(userFavourites)
	} catch (error) {
		res.status(500).json({
			message: 'Failed to load favourites',
		})
	}
})

router.post('/', auth, (req, res) => {
	try {
		const { movieId, title, poster, release_date } = req.body

		if (!movieId || !title) {
			return res.status(400).json({
				message: 'Missing required fields',
			})
		}
		const favourites = readJSON(FAVOURITES_PATH)

		const exists = favourites.find(fav => fav.userId === req.user.id && fav.movieId === movieId)

		if (exists) {
			return res.status(409).json({ message: 'Already added' })
		}
		const newFav = {
			id: Date.now(),
			userId: req.user.id,
			movieId,
			title,
			poster,
			release_date,
		}

		favourites.push(newFav)
		writeJSON(FAVOURITES_PATH, favourites)
		res.status(201).json(newFav)
	} catch (error) {
		res.status(500).json({
			message: 'Failed to add favourite',
		})
	}
})

router.delete('/:id', auth, (req, res) => {
	try {
		const favourites = readJSON(FAVOURITES_PATH)
		const existing = favourites.find(fav => fav.movieId == req.params.id && fav.userId === req.user.id)

		if (!existing) {
			return res.status(404).json({
				message: 'Favourite not found',
			})
		}

		const updated = favourites.filter(fav => !(fav.movieId == req.params.id && fav.userId === req.user.id))

		writeJSON(FAVOURITES_PATH, updated)

		res.status(204).send()
	} catch (error) {
		res.status(500).json({
			message: 'Failed to delete favourite',
		})
	}
})

module.exports = router
