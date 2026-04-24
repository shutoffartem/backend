import express from "express"
import 'dotenv/config'
import connectMongoDB from './db/mongodb.js'
import albumRoutes from './routes/albums.js'

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/albums', albumRoutes)

async function start() {
    try {
        await connectMongoDB(process.env.MONGO_URI)
        console.log('MongoDB connected')

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('MongoDB connection error:', error.message)
    }
}

start()