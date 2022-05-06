const express = require('express')
const app = express()

let entries = [
    { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
    },
    { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
    },
    { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
    },
    { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
    }
]

// Endpoint for getting all entries
app.get('/api/persons', (req, res) => {
    res.json(entries)
})

// Getting info
app.get('/api/info', (req, res) => {
    const info = `<p>Phonebook has info for ${entries.length} people</p>`
    const date = new Date().toUTCString()
    const infoPage = info + date
    res.send(infoPage)
})

// Get info for a single entry
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = entries.find((entry) => entry.id === id)
    
    // respond with entry if found
    if (found) {
        res.json(found)
        return
    }
    // respond with status 404 if not  found
    res.status(404).end()
})

// Delete entry from phonebook
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    entries = entries.filter((entry) => entry.id !== id)
    // Return success
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})