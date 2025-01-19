const express = require('express');
const Router = express.Router();
const StudentCtrls = require('../controllers/StudentsCtrls');
const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    }
});

var upload = multer({ storage: storage });

// Define routes
Router.get('/count', StudentCtrls.countStudents);
Router.post('/createstudent', StudentCtrls.createStudent);
Router.get('/getStudents', StudentCtrls.getAllStudents);
Router.get('/getStudent/:id', StudentCtrls.getStudent);
Router.delete('/deleteAllStudents', StudentCtrls.deleteAllStudents);
Router.delete('/deleteStudent/:id', StudentCtrls.deleteStudent);
Router.put('/updateStudent/:id', StudentCtrls.updateStudent);
Router.get('/filiere/:filiereId/element/:elementName', StudentCtrls.getStudentsByElementName);

// Route for importing students from a CSV file
Router.post('/import', upload.single('file'), StudentCtrls.importStud);

module.exports = Router;
