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

//create new note by reading file and then write the file into the db.json file
app.post('/api/notes', function (req, res) {
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if(err) throw err
        const allNotes = JSON.parse(data)
        console.log(allNotes)
        // define the new note and make a unique ID
        const newNote = req.body
        // use a for loop to add new notes to a unique ID

        for(i=0; i<allNotes.length; i++){
            newNote.id = i
        }
        console.log(newNote.id)
        allNotes.push(newNote)
        console.log(allNotes)
        fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err) => {
            if(err) {
                console.log(err)
                res.json(allNotes)
            }
        })
    })
})

//delete
app.delete('/api/notes/:id', function (req, res) {
    const id = req.params.id
    // we will need to read the db.json
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) throw err
        const allNotes = JSON.parse(data)
        for(i=0; i < allNotes.length+1;i++){
            console.log(allNotes.id[i])
            if(allNotes.id !== id){
                allNotes.splice(i,1)
             //splice is used to add/remove items to/from an array and returns the removed items
            }
        }
        fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err) => {
            if(err) throw err
        })
    })
})
// listener
app.listen(PORT, () => {
    console.log(`App listening on PORT localhost: ${ PORT }`)
});