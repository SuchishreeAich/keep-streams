const notesService = require('./notes.service');

//upload notes
const uploadNotes = () => {
    // console.log('add notes 2');
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