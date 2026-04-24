import http from "http"
import { getSystemInfo } from "./system-utils.js"

const PORT = 3000

const server = http.createServer(async (req, res) => {
    const url = req.url

    // Route: /api/system
    if (url === "/api/system") {
        const data = await getSystemInfo()

        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(data, null, 2))
        return
    }

    // Route: /api/time
    if (url === "/api/time") {
        const now = new Date()

        const data = {
            iso: now.toISOString(),
            unix: Math.floor(now.getTime() / 1000)
        }

        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(data, null, 2))
        return
    }

    // Route: /
    if (url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(`
      <h1>System API</h1>
      <ul>
        <li><a href="/api/system">System Info</a></li>
        <li><a href="/api/time">Time API</a></li>
      </ul>
    `)
        return
    }

    // 404 fallback
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("404 Not Found")
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})