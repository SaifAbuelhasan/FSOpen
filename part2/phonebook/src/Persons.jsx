import Entry from './Entry'

const Persons = ({persons, handleDelete}) => {
  return (
    <ul>
      {
        persons.map((person) => 
          <li key={person.id}>
            <Entry name={person.name} number={person.number}/> 
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </li>
        )
      }
    </ul>
  )
}
 
export default Persons