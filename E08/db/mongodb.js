import mongoose from 'mongoose'

let isConnected = false

const connectMongoDB = async (url) => {
    if (!url) throw new Error("Missing Mongo URI")

    if (isConnected) return

    await mongoose.connect(url)
    isConnected = true
}

export default connectMongoDB