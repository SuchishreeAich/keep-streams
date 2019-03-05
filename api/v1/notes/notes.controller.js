const notesService = require('./notes.service');

//upload notes
const uploadNotes = () => {
    return notesService.uploadNotes();
}

//get notes
const getNotes = () => {
    return notesService.getNotes();
}

module.exports = {
    getNotes,
    uploadNotes
}