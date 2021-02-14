// dependencies
const express = require('express')
const path = require('path')
const fs = require('fs')
// configure express
const app = express()
// set port
const PORT = process.env.PORT || 8080
// set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
// data

// routes
//--------------------
//send user first to homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
//notes page
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})
//display all notes
app.get('/api/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    })
})

//create new note
app.post('/api/notes', function (req, res) {
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if(err) throw err
        const allNotes = JSON.parse(data)
        console.log(allNotes)
    })
  
})
//delete
app.delete('/api/notes/:id', function (req, res) {
    const id = req.params.id
})
// listener
app.listen(PORT, () => {
    console.log(`App listening on PORT localhost: ${ PORT }`)
});