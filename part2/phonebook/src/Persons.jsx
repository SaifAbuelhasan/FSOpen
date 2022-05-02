import Entry from './Entry'

const Persons = ({persons}) => {
  return (
    <ul>
      {
        persons.map((person) => 
          <li key={person.id}><Entry name={person.name} number={person.number}/></li>
        )
      }
    </ul>
  )
}
 
export default Persons