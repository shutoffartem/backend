import express from 'express'

const app = express()
const PORT = 3000

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Myer!</h1>')
})

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
