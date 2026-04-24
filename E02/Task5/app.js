import express from "express"
import albumRoutes from "./routes/albums.js"

const app = express()
app.use(express.json())

app.use("/albums", albumRoutes)

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})