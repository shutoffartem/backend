import mongoose from 'mongoose'

const currentYear = new Date().getFullYear()

const genres = [
    'Pop',
    'Rock',
    'Hip-Hop',
    'Electronic',
    'Jazz',
    'Classical'
]

const albumSchema = new mongoose.Schema(
    {
        artist: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        title: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        tracks: {
            type: Number,
            required: true,
            min: 1,
            max: 100
        },
        year: {
            type: Number,
            required: true,
            min: 1900,
            max: currentYear
        },
        genre: {
            type: String,
            required: true,
            enum: genres
        },
        artistTitle: {
            type: String,
            validate: {
                validator: async function () {
                    const existing = await this.constructor.findOne({
                        artist: this.artist,
                        title: this.title,
                        _id: { $ne: this._id }
                    })

                    return !existing
                },
                message: 'Album already exists'
            }
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

albumSchema.virtual('ageInYears').get(function () {
    return new Date().getFullYear() - this.year
})

albumSchema.methods.isClassic = function () {
    return this.ageInYears > 25
}

albumSchema.statics.findByGenre = function (genre) {
    return this.find({ genre })
}

albumSchema.pre('validate', function () {
    this.artistTitle = `${this.artist}-${this.title}`
})

export default mongoose.model('Album', albumSchema)

