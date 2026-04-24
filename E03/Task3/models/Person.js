import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
})

export default mongoose.model('Person', personSchema)