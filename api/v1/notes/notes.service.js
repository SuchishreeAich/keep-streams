const noteDAO = require('./notes.dao');

// upload notes
const uploadNotes = () => {
    //console.log('add notes 3');
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