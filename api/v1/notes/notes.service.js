const noteDAO = require('./notes.dao');

// upload notes
const uploadNotes = () => {
    return noteDAO.uploadNotes();
}

// get notes
const getNotes = () => {
    return noteDAO.getNotes();
}

module.exports = {
    uploadNotes,
    getNotes
}