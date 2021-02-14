// dependencies
const express = require('express')
const path = require('path')
// configure express
const app = express()
// set port
const PORT = process.env.PORT || 8080
// set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// data
const notes = []
// routes
//--------------------
//send user first to homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
})
//notes page
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/notes.html'))
})
//display all notes
app.get('/api/notes')
//create new note
app.post('/api/notes', function (req, res) {
    const newNote = req.body
    notes.push(newNote)
    res.json(newNote)
})
// listener
app.listen(PORT, () => {
    console.log(`App listening on PORT localhost:${PORT}`)
});