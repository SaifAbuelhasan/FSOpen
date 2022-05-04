import { useEffect, useState } from 'react'
import personService from './services'
import EntryForm from './EntryForm'
import Persons from './Persons'
import Notification from './Notifcation'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Fetch data from server and set them as initial state.
    personService
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons)
    })
    // Alternative way of getting data
    /*   const getPersons = async () => {
        const data = (await axios.get('http://localhost:3001/persons')).data
        setPersons(data)
      }
      getPersons() */

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
    // Check if name already exists in phonebook, edit number if they do exist.
    const foundPerson = persons.find(p => p.name === newName)
    if (foundPerson) {
      if (window.confirm(`${newName} already exists, replace the old number with a new one?`)) {
        const updatedPerson = {...foundPerson, number: newNumber}
        personService
          .update(updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson)) 
          })
        }
        
        return
      }
      const newPerson = {
        id: persons.length+1,
        name: newName,
        number: newNumber,
      }
      
      // Add the newPerson to the server
      personService
      .create(newPerson)
      .then((createdPerson) => {
        // Concat copies the array adding the new element. Doesn't change the original.
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        // Show added person notification for 5 seconds.
        setNotification({message: `Added ${createdPerson.name}`, color: 'green'})
        // setTimeout(() => {
        //   setNotification(null)
        // }, 5000)
      })
    }
    
    // Delete person
    const removeEntry = (id, name) => {
      if (window.confirm(`Delete ${name}`)) {
        personService
        .remove(id)
        .then((deletedPerson) => {
          setPersons(persons.filter((person) => person.id !== id))
          return deletedPerson
        })
        .catch((deletedPerson) => {
          // Show error notification for 5 seconds.
          setNotification({message: `Information of ${name} has already been deleted`, color: 'red'})
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {
        notification !== null
        ?
        <Notification notification={notification} />
        :
        null
      }
      <div>
        filter shown with<input value={search} onChange={handleSearchChange} />
      </div>

      <EntryForm newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addEntry={addEntry} />

      <h2>Numbers</h2>
      {/* Show persons that match the search */}
      <Persons persons={persons.filter(person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)} handleDelete={removeEntry} />
    </div>
  )
}

export default App
