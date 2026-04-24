import express from 'express'
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