import express from 'express'
import Album from '../models/Album.js'
import {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
} from '../controllers/albums.js'

const router = express.Router()

router.get('/', getAlbums)
router.get('/:id', getAlbum)
router.post('/', createAlbum)
router.put('/:id', updateAlbum)
router.delete('/:id', deleteAlbum)

export default router

router.get('/genre/:genre', async (req, res) => {
    try {
        const albums = await Album.findByGenre(req.params.genre)
        res.json(albums)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})