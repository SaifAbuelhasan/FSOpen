const express = require('express')
const app = express()
const morgan = require('morgan')

// For getting request json content
app.use(express.json())


// Creating body token
morgan.token('body', (req, res, next) => {
    if (req.method === 'POST') {
        const object = JSON.stringify(req.body)
        return object
    }
    return null
})

// For logging messages
app.use(morgan(function (tokens, req, res) {
    // Fields to log
    const fields = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]
    // Add the body token if it's a post request
    if (req.method === 'POST') {
        return [...fields, '-', tokens.body(req, res)].join(' ')
    }
    return fields.join(' ')
}))

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

// Generate new unique id for new entry
const generateId = () => {
    // Get largest id from entries
    const maxId = entries.length > 0
        ? Math.max(...entries.map((entry) => entry.id))
        : 0
    return maxId + 1
}

// Add a new entry
app.post('/api/persons', (req, res) => {
    let newEntry = req.body
    const found = entries.find((entry) => entry.name === newEntry.name)
    // Check that name and number exists
    if (!newEntry.name || !newEntry.number) {
        res.status(400).send('New entry must contain name and number!')
        return
    }
    // Check if name already exists
    if (found) {
        res.status(400).send('Name must be unique')
        return
    }

    const id = generateId()
    newEntry = {id, ...newEntry}
    entries = entries.concat(newEntry)
    res.json(newEntry)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})