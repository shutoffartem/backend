import os from "os"

export async function getSystemInfo() {
    return {
        nodeVersion: process.version,
        uptimeSeconds: os.uptime(),
        totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
        platform: os.platform(),
        architecture: os.arch(),
        cpuCores: os.cpus().length
    }
}