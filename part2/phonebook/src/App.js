import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')


  function handleChange(e) {
    setNewName(e.target.value)
  }
  function addPerson(e) {
    e.preventDefault();

    const existingName = newName && persons
      .find(person => person.name === newName)

    console.log(existingName);

    if (existingName === '') alert('Please add a name')
    else if (!!existingName) alert(`${newName} is already added to phonebook`)
    else {
      const newPerson = {
        name: newName
      }
      setPersons([newPerson, ...persons])
      setNewName('')

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
