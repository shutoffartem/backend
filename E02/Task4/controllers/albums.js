import Album from '../models/Album.js'

export const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find({})
        res.status(200).json({ albums })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).exec()

        if (!album) {
            return res.status(404).json({ msg: 'Album not found' })
        }

        res.status(200).json({ album })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body)
        res.status(201).json({ album })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updateAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        if (!album) {
            return res.status(404).json({ msg: 'Album not found' })
        }

        res.status(200).json({ album })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id)

        if (!album) {
            return res.status(404).json({ msg: 'Album not found' })
        }

        res.status(200).json({ msg: 'Album deleted' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}