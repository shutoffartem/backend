import express from 'express'
import Album from '../models/Album.js'
import auth from '../middleware/auth.js'
import {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    register,
    login
} from '../controllers/albums.js'

const router = express.Router()

router.get('/', getAlbums)
router.get('/:id', getAlbum)
router.post('/', auth, createAlbum)
router.put('/:id', auth, updateAlbum)
router.delete('/:id', auth, deleteAlbum)
router.post('/register', register)
router.post('/login', login)

export default router

router.get('/genre/:genre', async (req, res) => {
    try {
        const albums = await Album.findByGenre(req.params.genre)
        res.json(albums)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})