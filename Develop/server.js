// Required npm package.
const express = require('express');

// Creating express server.  
const app = express();

// Setting up port.
const PORT = process.env.PORT || 5500;

// It's data parsing time!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Calling in data.
const notesData = require('../db/db');

// Paths to HTML files.
const path = require('path');
module.exports = (app) => {
    app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, './public/notes'));
    });
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index'));
    });
 };

// Routing, GET, and POST requests.
module.exports = (app) => {
    app.get('./public/notes', (req, res) => res.json(notesData));
    app.post('./public/notes', (req, res) => res.json(notesData));
};

 // Listener.
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});