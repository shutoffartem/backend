import express from "express"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static("public"))

const users = [
    { id: 1, name: "Anna", email: "anna@test.com" }
]

app.get("/api/users", (req, res) => {
    res.json(users)
})

app.post("/api/users", (req, res) => {
    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        })
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    }

    users.push(newUser)
    res.status(201).json(newUser)
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})