import fs from "fs/promises"

const filename = "output.txt"

async function runFileOps() {
    try {
        const content = `
Name: Artem
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
`

        // Write file
        await fs.writeFile(filename, content.trim())

        // Read file
        const data = await fs.readFile(filename, "utf8")

        console.log("File contents:\n")
        console.log(data)

    } catch (error) {
        console.error("Error:", error.message)
    }
}

runFileOps()