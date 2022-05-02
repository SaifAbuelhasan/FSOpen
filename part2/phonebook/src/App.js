import { useEffect, useState } from 'react'
import axios from 'axios'
import EntryForm from './EntryForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // Fetch data from server and set them as initial state.
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
    })
  }, [])


  const handleSearchChange = (event) => {
    setSearch(event.target.value)    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    // Check if name already exists in phonebook
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} already exists!`)
    }
    const newPerson = {
      id: persons.length+1,
      name: newName,
      number: newNumber,
    }
    // Concat copies the array adding the new element. Doesn't change the original.
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <div>
        filter shown with<input value={search} onChange={handleSearchChange} />
      </div>

      <EntryForm newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addEntry={addEntry} />

      <h2>Numbers</h2>
      {/* Show persons that match the search */}
      <Persons persons={persons.filter(person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)} />
    </div>
  )
}

export default App
