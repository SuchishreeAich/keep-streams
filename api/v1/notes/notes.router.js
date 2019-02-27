const router = require('express').Router();
const notesCtrl = require('./notes.controller');

//upload notes
router.post('/',(req,res) => {  
    
    notesCtrl.uploadNotes().then((response) => {
        res.status(response.status).send(response);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});


//get notes
router.get('/',(req,res) => {  
    
    notesCtrl.getNotes().then((response) => {
        res.status(response.status).send(response);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});


module.exports = router;