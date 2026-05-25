const express = require('express')
const { readJSON, writeJSON } = require('../utils/file')
const auth = require('../middleware/auth')

const router = express.Router()

const FAVOURITES_PATH = './data/favourites.json'

// GET favoUrites
router.get('/', auth, (req, res) => {
	const favourites = readJSON(FAVOURITES_PATH)

	const userFavourites = favourites.filter(fav => fav.userId === req.user.id)

	res.json(userFavourites)
})

// ADD favoUrite
router.post('/', auth, (req, res) => {
	const { movieId, title, poster, release_date } = req.body

	const favourites = readJSON(FAVOURITES_PATH)

	const exists = favourites.find(fav => fav.userId === req.user.id && fav.movieId === movieId)

	if (exists) {
		return res.status(400).json({ message: 'Already added' })
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

	res.json(newFav)
})

// DELETE favoUrite
router.delete('/:id', auth, (req, res) => {
	const favourites = readJSON(FAVOURITES_PATH)

	const updated = favourites.filter(fav => !(fav.movieId == req.params.id && fav.userId === req.user.id))

	writeJSON(FAVOURITES_PATH, updated)

	res.json({ message: 'Deleted' })
})

module.exports = router
