import express from 'express'
import {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    register,
    login,
    logout
} from '../controllers/albums.js'

import { requireAuth } from '../middleware/sessionAuth.js'

const router = express.Router()

router.get('/', getAlbums)
router.get('/:id', getAlbum)

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.post('/', requireAuth, createAlbum)
router.put('/:id', requireAuth, updateAlbum)
router.delete('/:id', requireAuth, deleteAlbum)

export default router