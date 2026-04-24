import express from "express"
import fs from "fs/promises"
import 'dotenv/config'
import connectMongoDB from './db/mongodb.js'
import albumRoutes from './routes/albums.js'

const app = express()
app.use(express.json())
app.use('/api/albums', albumRoutes)

const PORT = 3000

async function loadAlbums() {
    const data = await fs.readFile("./data/albums.json", "utf8")
    return JSON.parse(data).albums
}

async function saveAlbums(albums) {
    await fs.writeFile(
        "./data/albums.json",
        JSON.stringify({ albums }, null, 2)
    )
}

// GET all
app.get("/albums", async (req, res) => {
    const albums = await loadAlbums()
    res.json(albums)
})

// GET one
app.get("/albums/:id", async (req, res) => {
    const albums = await loadAlbums()
    const album = albums.find(a => a.id === parseInt(req.params.id))

    if (!album) return res.status(404).json({ error: "Not found" })

    res.json(album)
})

// POST
app.post("/albums", async (req, res) => {
    const albums = await loadAlbums()

    const newAlbum = {
        id: Date.now(),
        ...req.body
    }

    albums.push(newAlbum)
    await saveAlbums(albums)

    res.status(201).json(newAlbum)
})

// PUT
app.put("/albums/:id", async (req, res) => {
    const albums = await loadAlbums()

    const index = albums.findIndex(a => a.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ error: "Not found" })

    albums[index] = { ...albums[index], ...req.body }

    await saveAlbums(albums)

    res.json(albums[index])
})

// DELETE
app.delete("/albums/:id", async (req, res) => {
    let albums = await loadAlbums()

    albums = albums.filter(a => a.id !== parseInt(req.params.id))

    await saveAlbums(albums)

    res.json({ message: "Deleted" })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

try {
    await connectMongoDB(process.env.MONGO_URI)
    console.log('✅ MongoDB connected')

    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    )
} catch (error) {
    console.error(error)
}