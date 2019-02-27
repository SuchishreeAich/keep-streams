const noteModule = require('./notes.entity');
const dbConfigVal = require('../../../config').appConfig.dbConfig;
const uuidv1 = require('uuid/v1');
const streamToMongoDB = require('stream-to-mongo-db');
const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');
const JSONStream = require('JSONStream');
const notesFile = path.resolve(__dirname, '../../../', 'mock_notes.json');


const notesTransform = new Transform({
    readableObjectMode : true,
    writableObjectMode : true,
    transform(note,encoding,done){

        let noteUpload = new noteModule();
        noteUpload.id = uuidv1();
        noteUpload.title = note.title;
        noteUpload.text = note.text;
        noteUpload.userId = note.userId;

        this.push(noteUpload);
        done();       
    }
});

const uploadNotes = () => {

    return new Promise((resolve,reject) => {

        const uploadDB = {dbURL : dbConfigVal.mongoUrl,collection : "notes"};

        const notesWriteStream = streamToMongoDB.streamToMongoDB(uploadDB);

        const notesReadStream = fs.createReadStream(notesFile,'utf8').pipe(JSONStream.parse('*'));

        const notesUploadSTream = notesReadStream.pipe(notesTransform).pipe(notesWriteStream);

        notesUploadSTream.on('finish' , () =>resolve({message : 'Notes uploaded', status : 201}))
        .on('error', (error) => reject({message : error.message , status : 500}));

    }); 
};

const getNotes = () => {
    return new Promise((resolve,reject) => {

        let notesReadStream = fs.createReadStream(notesFile,'utf8').
        pipe(JSONStream.parse('*'));

        let readResult = [];

        notesReadStream.on('data',(data) => readResult.push(data))
        .on('end',() => resolve({message : 'Notes found',status : 200,notes : readResult}))
        .on('error',(error) => reject({message : error.message,status : 500}))
    });
};


module.exports = {
    uploadNotes,
    getNotes
}