// Required npm package + path to HTML files.
const express = require('express');
const path = require('path');

// Creating express server + setting up port.
const app = express();
const PORT = 5500;

// It's data parsing time!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Calling in database.
const notesData = require('./db/db.json');
function getJson(req, res, next){
    res.send(notesData);
}
console.log ("notesData");

// Routes.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// Receive data.
app.post('/public/notes', (req, res) => res.json(notesData));
app.get('/public/notes', (req, res) => res.json(notesData));

 // Listener.
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});