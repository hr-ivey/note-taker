// Required npm package + path to HTML files + database.
const express = require('express');
const path = require('path');
const fs = require ('fs')
let notesData = require('../db/db.json');

// Creating express server + setting up port.
const app = express();
const PORT = process.env.PORT || 3000;

// It's data parsing time!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// Receive data.
app.get('/api/notes', (req, res) => res.json(notesData));
app.post('/api/notes', (req, res) => {
    notesData.push (req.body)
    let notes = JSON.stringify(notesData)
    fs.writeFile(__dirname + '/../db/db.json', notes, (err) => {
        if (err) throw err;
    });
    res.end();
});

 // Listener.
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});