import express from "express"

const app = express()
const PORT = 3000

const users = [
    { id: 1, name: "Leslie Parks", email: "leslie.parks@cityplanning.gov" },
    { id: 2, name: "Sherlock Holmes", email: "sherlock@221b.co.uk" },
    { id: 3, name: "Michael Scott", email: "worldsbestboss@dundermifflin.com" }
]

app.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>")
})

app.get("/api/users", (req, res) => {
    res.json(users)
})

app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(u => u.id === userId)

    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
})

app.get("/api/echo/:message", (req, res) => {
    res.json({ message: req.params.message })
})

app.get("/contact", (req, res) => {
    res.send("<h1>Contact: ah4895@student.jamk.fi</h1>")
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})