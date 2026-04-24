import Album from '../models/Album.js'

// GET all (filters + pagination still allowed)
export const getAlbums = async (req, res) => {
    try {
        let queryObject = {}

        if (req.query.year) {
            queryObject.year = Number(req.query.year)
        }

        if (req.query.startYear && req.query.endYear) {
            queryObject.year = {
                $gte: Number(req.query.startYear),
                $lte: Number(req.query.endYear)
            }
        }

        if (req.query.search) {
            queryObject.$or = [
                { artist: { $regex: req.query.search, $options: 'i' } },
                { title: { $regex: req.query.search, $options: 'i' } }
            ]
        }

        let query = Album.find(queryObject)

        if (req.query.fields) {
            query = query.select(req.query.fields.split(',').join(' '))
        }

        if (req.query.sort) {
            query = query.sort(req.query.sort.split(',').join(' '))
        } else {
            query = query.sort('year')
        }

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page - 1) * limit

        const total = await Album.countDocuments(queryObject)

        const albums = await query.skip(skip).limit(limit)

        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            count: albums.length,
            data: albums
        })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// GET one
export const getAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id)

        if (!album) {
            return res.status(404).json({ msg: 'Album not found' })
        }

        res.json(album)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// POST
export const createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body)
        res.status(201).json(album)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// PUT
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

        res.json(album)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// DELETE
export const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id)

        if (!album) {
            return res.status(404).json({ msg: 'Not found' })
        }

        res.json({ msg: 'Deleted' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}