const EntryForm = ({newName, newNumber, handleNameChange, handleNumberChange, addEntry}) => {
  return (
      <>
        <h2>Add a new</h2>
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit" onClick={addEntry}>add</button>
            </div>
        </form>
      </>
  )
}
 
export default EntryForm