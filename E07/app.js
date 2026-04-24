import express from 'express'
import session from 'express-session'
import 'dotenv/config'

import connectMongoDB from './db/mongodb.js'
import albumRoutes from './routes/albums.js'
import passport from './config/passport.js'

const app = express()
const PORT = 3000

app.use(express.json())

app.use(
    session({
        secret: 'mysecret123',
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/albums', albumRoutes)

async function start() {
    try {
        await connectMongoDB(process.env.MONGO_URI)

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}

start()