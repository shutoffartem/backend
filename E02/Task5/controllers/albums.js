import fs from "fs/promises"

const FILE = "./data/albums.json"

async function read() {
    const data = await fs.readFile(FILE, "utf8")
    return JSON.parse(data).albums
}

async function write(albums) {
    await fs.writeFile(FILE, JSON.stringify({ albums }, null, 2))
}

export async function getAll(req, res) {
    res.json(await read())
}

export async function getOne(req, res) {
    const albums = await read()
    const album = albums.find(a => a.id === parseInt(req.params.id))
    if (!album) return res.status(404).json({ error: "Not found" })
    res.json(album)
}

export async function create(req, res) {
    const albums = await read()
    const newAlbum = { id: Date.now(), ...req.body }
    albums.push(newAlbum)
    await write(albums)
    res.status(201).json(newAlbum)
}

export async function update(req, res) {
    const albums = await read()
    const index = albums.findIndex(a => a.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ error: "Not found" })

    albums[index] = { ...albums[index], ...req.body }
    await write(albums)

    res.json(albums[index])
}

export async function remove(req, res) {
    let albums = await read()
    albums = albums.filter(a => a.id !== parseInt(req.params.id))
    await write(albums)

    res.json({ message: "Deleted" })
}