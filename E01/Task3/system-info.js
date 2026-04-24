import os from "os"

function getSystemInfo() {
  return {
    uptimeSeconds: os.uptime(),
    totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
    platform: os.platform(),
    architecture: os.arch(),
    cpuCores: os.cpus().length
  }
}

console.log("System Info:")
console.log(getSystemInfo())