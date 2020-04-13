const { Schema, model }= require('mongoose')

const NoteSchema = new Schema({
    title: String,
    description: {
        type: String,
    }, user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema)