import Album from '../models/Album.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

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

        query = query.skip(skip).limit(limit)

        const albums = await query

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

export const createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body)
        res.status(201).json(album)
    } catch (error) {
        res.status(400).json({ msg: error.message })
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

        res.json(album)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id)

        if (!album) {
            return res.status(404).json({ msg: 'Album not found' })
        }

        res.json({ msg: 'Deleted' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password, passwordConfirm } = req.body

        if (!name || !email || !password || !passwordConfirm) {
            return res.status(400).json({ msg: 'All fields required' })
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ msg: 'Passwords do not match' })
        }

        const existing = await User.findOne({ email })

        if (existing) {
            return res.status(400).json({ msg: 'Email already exists' })
        }

        const user = await User.create({
            name,
            email,
            password
        })

        res.status(201).json({
            msg: 'User registered',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' })
        }

        const valid = await user.comparePassword(password)

        if (!valid) {
            return res.status(401).json({ msg: 'Invalid credentials' })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({ token })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}