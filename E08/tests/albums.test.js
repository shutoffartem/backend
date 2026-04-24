import { describe, test, expect, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import fs from 'fs/promises'

import app from '../app.js'
import Album from '../models/Album.js'
import connectMongoDB from '../db/mongodb.js'

import 'dotenv/config'
process.env.NODE_ENV = 'test'

process.env.NODE_ENV = 'test'

beforeEach(async () => {
    await connectMongoDB(process.env.TEST_MONGO_URI)

    await Album.deleteMany({})

    const data = JSON.parse(
        await fs.readFile('./tests/data.json', 'utf8')
    )

    await Album.insertMany(data)
})

describe('Albums API', () => {
    test('GET /albums returns exact seeded count', async () => {
        const res = await request(app).get('/albums')

        expect(res.statusCode).toBe(200)
        expect(res.body.data.length).toBe(2)
    })

    test('POST /albums adds album', async () => {
        const before = await Album.countDocuments()

        const res = await request(app)
            .post('/albums')
            .send({
                artist: 'Coldplay',
                title: 'Parachutes',
                tracks: 10,
                year: 2000,
                genre: 'Rock'
            })

        const after = await Album.countDocuments()

        expect(res.statusCode).toBe(201)
        expect(after).toBe(before + 1)
        expect(res.body.artist).toBe('Coldplay')
    })

    test('DELETE /albums/:id removes album', async () => {
        const album = await Album.findOne()

        const before = await Album.countDocuments()

        const res = await request(app).delete(`/albums/${album._id}`)

        const after = await Album.countDocuments()

        expect(res.statusCode).toBe(200)
        expect(after).toBe(before - 1)
    })

    test('DELETE invalid id handled gracefully', async () => {
        const fakeId = new mongoose.Types.ObjectId()

        const res = await request(app).delete(`/albums/${fakeId}`)

        expect([404, 500]).toContain(res.statusCode)
    })
})