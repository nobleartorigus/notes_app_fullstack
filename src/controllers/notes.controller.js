const Note = require('../models/Note')
const NotesController = {}

NotesController.renderNoteForm = (req, res) => {
    //res.send('Note add')
    res.render('notes/new-note')
}

NotesController.createNewNote = async (req, res) => {
    const { title, description } = req.body
    newNote = new Note({title, description})
    newNote.user = req.user.id
    
    await newNote.save()
    //res.send('New note created')
    req.flash('success_message', 'Note Added Succesfully')
    res.redirect('/notes')
}

NotesController.renderNotes = async (req, res) => {
    //res.send('Render All Notes')
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}).lean()
    res.render('notes/all-notes', { notes })
}

NotesController.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean()
    console.log(note)
    if (note.user != req.user.id) {
        req.flash('error_message', 'Not Authorized')
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', { note })
    
}

NotesController.updateNote = async (req, res) => {
    console.log(req.body)
    const { title, description } =req.body
    //res.send('Update Note')
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_message', 'Note Updated Succesfully')
    res.redirect('/notes')
}

NotesController.deleteNote = async (req, res) => {
    //res.send('Deleting Note')
    await Note.findByIdAndDelete(req.params.id)
    console.log('Deleting Note')
    req.flash('success_message', 'Note Deleted Succesfully')

    res.redirect('/notes')
}

module.exports = NotesController