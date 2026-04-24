import express from "express"
import fs from "fs/promises"
import 'dotenv/config'
import connectMongoDB from './db/mongodb.js'
import albumRoutes from './routes/albums.js'

const app = express()
app.use(express.json())

app.use('/albums', albumRoutes)

const PORT = process.env.PORT || 3000

// export app for tests
export default app

// only start server if NOT testing
if (process.env.NODE_ENV !== 'test') {
    await connectMongoDB(process.env.MONGO_URI)

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
}